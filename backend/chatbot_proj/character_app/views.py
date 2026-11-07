from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Character
import base64
from django.core.files.base import ContentFile
from .serializers import CharacterSerializer

from user_app.views import TokenReq


class All_Characters(TokenReq):
    def get(self, request):
        user = request.user
        character = Character.objects.filter(user=user)
        serializer = CharacterSerializer(character, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Copy the request data
        data = request.data.copy()

        # Handle base64 image if provided
        base64_image = data.pop('image', None)
        if base64_image:
            image_data = base64.b64decode(base64_image)
            data['image'] = ContentFile(image_data, name='character.png')

        # Set the user field to the authenticated user
        data['user'] = request.user.id

        # Create the serializer with the modified data
        serializer = CharacterSerializer(data=data)
        
        # Validate and save the character
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class A_Character(TokenReq):

    def put(self, request, id):
        user = request.user
        character = get_object_or_404(Character, id=id)
        serializer = CharacterSerializer(character, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        # Get the character object for the authenticated user
        character = get_object_or_404(Character, id=id, user=request.user)
        # Delete the character (this will also delete the image)
        character.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, id):
        user = request.user
        try:
            # Retrieve the specific character for the authenticated user
            character = Character.objects.get(user=user, id=id)
            serializer = CharacterSerializer(character)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Character.DoesNotExist:
            return Response({"error": "Character not found."}, status=status.HTTP_404_NOT_FOUND)