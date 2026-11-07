from rest_framework import serializers
from .models import Game, Theme, Location, Monster

class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = "__all__"

class MonsterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monster
        fields = "__all__"

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

class GameSerializer(serializers.ModelSerializer):
    theme = ThemeSerializer(read_only=True)  # Assuming a Game is related to one Theme
    monsters = MonsterSerializer(many=True, read_only=True, source='theme.monsters')  # Assuming Monsters are related to Theme
    locations = LocationSerializer(many=True, read_only=True, source='theme.locations')  # Assuming Locations are related to Theme

    class Meta:
        model = Game
        fields = ['id', 'user', 'character', 'turn_count', 'theme', 'monsters', 'locations']

        