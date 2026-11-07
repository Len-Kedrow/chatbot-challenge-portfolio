from django.db import models
from user_app.models import User
from character_app.models import Character


class Game(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_in_game')
    character = models.OneToOneField(Character, on_delete=models.CASCADE, related_name='game_character')
    turn_count = models.IntegerField(default=0)
    thread_id = models.CharField(max_length=45)


class Theme(models.Model):
    # THEME_CHOICES = [
    #     ('Fantasy', 'Fantasy'), 
    #     ('Sci-Fi', 'Sci-Fi'),
    #     ('Modern', 'Modern'),
    # ]    

    def __str__(self):
        return self.name  #ensures object is labeled using this field. 

    name = models.CharField(max_length=30)
    game = models.ForeignKey(Game, on_delete=models.SET_NULL, related_name='game_theme', null=True, blank=True)


class Monster(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE, related_name='monsters')

    def __str__(self):
        return self.name  #ensures object is labeled using this field.
    
class Location(models.Model):
    name = models.CharField(max_length=50)
    goal = models.TextField()
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE, related_name='locations')

    def __str__(self):
        return self.name  #ensures object is labeled using this field.