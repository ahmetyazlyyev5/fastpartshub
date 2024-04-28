from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import openai
from django.conf import settings

# Set OpenAI API key from Django settings
openai.api_key = settings.CHATGPT_API_KEY

from .gpt import call_gpt  # Ensure this module is properly implemented to call the GPT model

class ListPartsView(APIView):
    """
    API View to list parts based on the query provided.
    """

    def get(self, request):
        query = self.request.query_params.get("query")

        # Call the GPT function with the query
        try:
            parts = call_gpt(query=query)
            
            # Check if parts were found
            if parts:
                return Response({
                    "query": query,
                    "parts": parts
                }, status=status.HTTP_200_OK)
            else:
                # If no parts are found for the given query
                return Response(
                    {"message": "No parts found for the given query."},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        except Exception as e:
            # Generic exception handling for any other unexpected errors
            return Response(
                {"error": "An unexpected error occurred: {}".format(str(e))},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
