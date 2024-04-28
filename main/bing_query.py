key1 ="b9692618c2014940ae6798acb57481a4"
key2 = "2dc1cbe097884c07b0b901c3790415d2"
endpoint = "https://api.bing.microsoft.com/"

import requests
import json

def bing_search_options(form):
    options = []
    options.append(f"mkt={form['where']}")
    options.append(f"SafeSearch={'strict' if form['safe'] else 'off'}")
    if form['when']:
        options.append(f"freshness={form['when']}")
    aspect = next((item['value'] for item in form['aspect'] if item['checked']), 'all')
    options.append(f"aspect={aspect}")
    if form['color']:
        options.append(f"color={form['color']}")
    options.append(f"count={form['count']}")
    options.append(f"offset={form['offset']}")
    return "&".join(options)

# def bing_image_search(query, options, key):
#     if not query.strip():
#         print("Empty query, do nothing")
#         return
    
#     print("Working. Please wait.")
#     BING_ENDPOINT = 'https://api.bing.microsoft.com/v7.0/images/search'
#     query_url = f"{BING_ENDPOINT}?q={requests.utils.quote(query)}&{options}"
    
#     headers = {
#         "Ocp-Apim-Subscription-Key": key,
#         "Accept": "application/json"
#     }
    
#     try:
#         response = requests.get(query_url, headers=headers)
#         handle_bing_response(response)
#     except requests.RequestException as e:
#         print("Error completing request:", e)

# def handle_bing_response(response):
#     if response.status_code == 200:
#         try:
#             results = response.json()
#             print(json.dumps(results, indent=2))
#             # Additional rendering of search results can be added here
#         except json.JSONDecodeError:
#             print("Invalid JSON response")
#     else:
#         print(f"HTTP Status {response.status_code} {response.reason}\n{response.text}")


def bing_image_search(query, options, key):
    if not query.strip():
        print("Empty query, do nothing")
        return []
    
    print("Working. Please wait.")
    BING_ENDPOINT = 'https://api.bing.microsoft.com/v7.0/images/search'
    query_url = f"{BING_ENDPOINT}?q={requests.utils.quote(query)}&{options}"
    
    headers = {
        "Ocp-Apim-Subscription-Key": key,
        "Accept": "application/json"
    }
    
    try:
        response = requests.get(query_url, headers=headers)
        return handle_bing_response(response)
    except requests.RequestException as e:
        print("Error completing request:", e)
        return []

def handle_bing_response(response):
    if response.status_code == 200:
        try:
            results = response.json()
            # Extract thumbnail URLs and return them
            thumbnails = [item['thumbnailUrl'] for item in results['value']]
            return thumbnails
        except json.JSONDecodeError:
            print("Invalid JSON response")
    else:
        print(f"HTTP Status {response.status_code} {response.reason}\n{response.text}")
    return []


# Example usage

def call_bing_search(query):
    form = {
        'where': 'en-US',
        'safe': True,
        'when': '',
        'aspect': [{'value': 'all', 'checked': True}],
        'color': '',
        'count': '10',
        'offset': '0'
    }

    options = bing_search_options(form)

    thumbnail_urls = bing_image_search(query, options, key1)
    # print(thumbnail_urls)
    return thumbnail_urls
