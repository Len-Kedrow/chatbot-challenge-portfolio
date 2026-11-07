from rest_framework import serializers
from .models import Character

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"

    def create(self, validated_data):
        image_data = validated_data.pop('image', None)
        instance = super().create(validated_data)
        if image_data:
            instance.image.save('character.png', image_data)
        return instance