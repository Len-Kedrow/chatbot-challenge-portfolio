from django.forms.models import model_to_dict
from game_app.models import Game
from user_app.models import User
from character_app.models import Character

def get_current_game(user_obj,character_obj):
            game = Game.objects.filter(user=user_obj, character=character_obj).first()
            if game:
                 # If a game is found, return the game_obj
                 return game
            else:
                 # If no game is found, return an appropriate response
                 return None
            
def game_instance_dict(user_str,character_str):
     game_instance = get_current_game(user_str, character_str)
     if game_instance==None:
        return f"No game with {user_str}'s character {character_str} exists"
     else:
        return model_to_dict(game_instance)