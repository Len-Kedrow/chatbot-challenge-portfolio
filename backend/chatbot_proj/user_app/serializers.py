from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["display_name", "email", "id", "last_login", "profile_picture", "wins", "losses"]