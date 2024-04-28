
from openai import OpenAI
import json 
import re
from .bing_query import call_bing_search


car = "Mercedes benz c300 2013"

make = None
model = None 
year = None 

max_retries = 10  # Define a maximum number of retries to prevent infinite loops

completion = None


def get_parts_categories(car, attempt=0):
    if attempt >= max_retries:
        print("Maximum retries reached, no valid categories found.")
        return None
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an auto parts professional."},
                {"role": "user", "content": f"""Give me a full list, exhaustive list of categories for each part aspect, like parts in trim, body parts, engine parts, parts in the back of the car for the {car}. I need this in JSON format only and do not include additional text.  Give me title of category, make, model, year. Give in this format: categories: [ title:String, make:String, model:String, year:String]. Also if year and model, make is unaivailable or you dont concretely, save as Null or None which is preferred in this format. Also when giving json remember JSON properties and string values must be enclosed in double quotes. If single quotes or no quotes are used, it will lead to a parsing error."""}
            ]
        )
    except Exception as e:
        print(f"Failed to fetch data from OpenAI: {e}")
        return None

    # Extract and check JSON data
    json_data = extract_json_from_message(completion.choices[0].message.content)
    print("CATEGORIES JSON DATA", json_data)
    if json_data and 'categories' in json_data and json_data['categories']:
        return json_data['categories']
    else:
        print(f"No categories found on attempt {attempt + 1}, retrying...")
        return get_parts_categories(car, attempt + 1)

json_format = """
parts: [{
            name: "Part name for example engine, console, front driver seat ",
            variations: [
                {
                    title: "If there could be variations add them for example: Leather seat",
                    minPrice: 1000,
                    maxPrice: 3000,
                    id: 1,
                    description:
                        "Mercedes benz c300 2013 leather seat, used condition",
                    image: "https://i.ebayimg.com/images/g/aaYAAOSwEoth6GJr/s-l400.jpg",
                },
                {
                    title: "If there could be variations add them for example: Carbon seat",
                    minPrice: 500,
                    maxPrice: 1500,
                    id: 2,
                    image: "https://i.ebayimg.com/images/g/aaYAAOSwEoth6GJr/s-l400.jpg",
                    description:
                        "Mercedes benz c300 2013 carbon seat, used condition",
                },
            ],
            key: "part_name_lowercase",
        }],
"""

def get_subparts(category,  attempt=0):
    if attempt >= max_retries:
        print("Maximum retries reached, no valid categories found.")
        return None

    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an auto parts professional."},
                {"role": "user", "content": f"I need full list of all parts of {car} only for {category} parts. List me all available for sale parts but only in this field. I need in json format with the name, description, minimum and maximum price in the market. I need full list of all parts, not simiplified. Parts that are in count more than one specify as seperate parts, but if they are completely same, pack them and give as a set. Dont show spark plags for example because it will go with engine. But specify as rear left door seperate than rear right door or front driver door. For example for wheels specify them as set because wheels wont go seperate because they are all the same. DONT GIVE SIMPLIFIED VERSION. GIVE FULL VERSION. And dont include any other things in asnwer other than json. Dont give me answer like you cant do that. DO your best. I need this json format: {json_format}. And also when giving json remember: JSON properties and string values must be enclosed in double quotes. If single quotes or no quotes are used, it will lead to a parsing error."}
            ]
        )
    except Exception as e:
        print(f"Failed to fetch data from OpenAI: {e}")
        return None

    # Extract and check JSON data
    json_data = extract_json_from_message(completion.choices[0].message.content )
    print("SUBCATEGORIES JSON DATA", json_data)
    if json_data and 'parts' in json_data and json_data['parts']:
        return json_data['parts']
    else:
        print(f"No categories found on attempt {attempt + 1}, retrying...")
        return get_subparts(category, attempt + 1)



def extract_json_from_message(message):
    # Ensure the message is a string
    #print("MESSAGE")
    if not isinstance(message, str):
        print("Invalid input: message is not a string")
        return None

    # Clean the message to extract JSON
    try:
        cleaned_message = re.sub(r'```json\n|\n```', '', message).strip()
        json_data = json.loads(cleaned_message)
        return json_data
    except re.error as re_err:
        print(f"Regex error: {re_err}")
        return None
    except json.JSONDecodeError as json_err:
        print(f"Failed to decode JSON: {json_err}")
        return None


# categories_message = completion.choices[0].message.content
# json_data = extract_json_from_message(categories_message)

# print(json_data)
# print("PRINTING CATEGORIES SEPERATELY")
# if json_data['categories']:
#     for category in json_data['categories']:
#         print(f"Category: {category['title']}, Make: {category['make']}, Model: {category['model']}, Year: {category['year']}")
#         # Search again but now with another prompt using title and adding result to the list

# else:
#     print("Failed to retrieve categories after several attempts.")



def check_uniqueness_of_parts( attempt=0):
    if attempt >= max_retries:
        print("Maximum retries reached, no valid categories found.")
        return None

    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an auto parts professional."},
                {"role": "user", "content": f"I want you to check that list for uniqueness, because there will be part names, maybe similar but different name, remove these ones and put only one piece of that. I want you to return in that format that i gave you and also dont add additional inforamtion. This is the json -> parts:{total_parts}. And also when giving json remember: JSON properties and string values must be enclosed in double quotes. If single quotes or no quotes are used, it will lead to a parsing error."}
            ]
        )
    except Exception as e:
        print(f"Failed to fetch data from OpenAI: {e}")
        return None

    # Extract and check JSON data
    json_data = extract_json_from_message(completion.choices[0].message.content )
    print("SUBCATEGORIES JSON DATA", json_data)
    if json_data and 'parts' in json_data and json_data['parts']:
        total_parts = json_data['parts']
    else:
        print(f"No categories found on attempt {attempt + 1}, retrying...")
        return check_uniqueness_of_parts(attempt + 1)



def call_gpt(query):
    car = query
    categories = get_parts_categories(car)
    total_parts = []


    if categories:
        make = categories[0]['make']
        model = categories[0]['model']
        year = categories[0]['year']
        for category in categories:
            #print(f"Category: {category['title']}") 
            parts = get_subparts(category['title'])
            total_parts.append(parts)
            # for part in parts:
            #     pass
                #print(f"Part: {part['name']}")
                

    print("All categories", categories)
    print("All parts", total_parts)
    
    check_uniqueness_of_parts()


    print("ALL PARTS AFTER UNIQUENESS", total_parts)
    # Now we need to fetch images for each part

    flattened_total_parts = [part for sublist in total_parts for part in sublist]
    print("flattened_total_parts", flattened_total_parts)

    for part in flattened_total_parts:
        if part['variations']:
            for variation in part['variations']:
                # fetch image list from bing
                list_of_images = call_bing_search(f"{car} - {variation['title']}")

                if len(list_of_images) > 0:
                    variation['image'] = list_of_images[0]
                    variation['images'] = list_of_images
                else:
                    variation['image'] = "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"
                    variation['images'] = ["https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"]
        else:

            variation = [
                {
                    "name":part['title'],
                    "minPrice":50,
                    "maxPrice":150,
                    "description":part['title']
                }
            ]
            list_of_images = call_bing_search(f"{car} - {variation['title']}")
            if len(list_of_images) > 0:
                variation[0]['image'] = list_of_images[0]
                variation[0]['images'] = list_of_images
            else:
                variation['image'] = "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"
                variation['images'] = ["https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"]
        
            part['variations'] = variation


    print("ALL IMAGES ADDED", flattened_total_parts)
    return flattened_total_parts
# call_gpt("Bmw 535xi e60 2008")