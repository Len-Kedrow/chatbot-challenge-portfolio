from django.shortcuts import  get_object_or_404
from rest_framework import status 
from .serializers import GameSerializer
from user_app.views import TokenReq
from rest_framework.response import Response
from user_app.models import User
from character_app.models import Character
from game_app.models import Game, Theme, Location

from .game_helper_functions import game_instance_dict, get_current_game

from openai_app import openai_service

#NOTE start unique imports from Erika's views.py file 
import json
from openai_app.openai_service import generate_response_with_assistant 
# Set up logging configuration: calling single logging config file to not over write other file loggers. 
from openai_app.logging_config import logger

# This Game class with start a new game or fecth a game in prograss and delete game data when finished. 
class GameState(TokenReq):
        def post(self, request):
            try:
                query_data = json.loads(request.body)
            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
            
            logger.debug(f"Recieved data:{query_data}") 
        
            character_obj = Character.objects.get(id=query_data["character"]["id"])  #use char_str to get characterobject
            user_obj =request.user
            theme_obj = Theme.objects.get(name=query_data["theme"])
            
            if Game.objects.filter(user=user_obj, character=character_obj).exists():
                game = Game.objects.get(user=user_obj, character=character_obj)
                game.turn_count =0
                game.save()

            else:

            
                game=Game.objects.create(
                    user=user_obj,
                    character=character_obj
                    
                )
                game.game_theme.add(theme_obj)
                game.save()
                
                
            serializer = GameSerializer(game) #serialize data passed in JSON
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        def get(self, request, game_id): 
            game = get_object_or_404(Game, id=game_id)
            serialized_game = GameSerializer(game)
            return Response(serialized_game.data, status=status.HTTP_200_OK)
        
        def delete(self, request, game_id):
            game = get_object_or_404(Game, id=game_id)
            game.delete()
            return Response(f"Game has been deleted", status=status.HTTP_204_NO_CONTENT)
            

#This game class will handle getting character prompt, sending package to openai_service, appending AI response and tracking turns            
class GameTurn(TokenReq): #Make this game turn. #make turn logic to return tread_id on first turn
    def put(self, request, game_id,):
        try:
            # Parse the JSON body from the incoming POST request to extract the prompt and thread_id
            this_game = get_object_or_404(Game, id=game_id)
            
            logger.debug(f"gameid: {game_id}")
            logger.debug(request)
            
            # this_game.turn_count = this_game.turn_count+1
            # this_game.save()

            # ERIKA added this - increment turn_count only once when processing a new turn
            this_game.turn_count += 1
            this_game.save()
            
            logger.debug("START GameTurn PUT CALL")
            logger.debug(this_game._meta.get_fields())
            logger.debug(this_game.game_theme)
            
            
            prompt = request.data.get('prompt', '')  # Get the prompt provided by the user
            thread_id = request.data.get('thread_id', None)  # Get the thread_id, if provided
            user = request.user
            logger.debug(f"this string{ thread_id}.")
            # Check if the authenticated user is an instance of the custom UserAuth model
            
                
            if isinstance(user, User):
                # Pulling game data from the related models
                theme_instance = this_game.game_theme.first()  # Get the first theme related to the game
                location = theme_instance.locations.first()  # Get the first location related to the theme
                monster = theme_instance.monsters.first()  # Get the first monster related to the theme

                logger.debug(f"location: {location} monster: {monster}")

                # Dynamically generate game data from the related models
                game_data = {
                    "environment_name": location.name,  # Get the name of the first location
                    "environment_goal": location.goal,  # Get the goal of the first location
                    "monster_name": monster.name,  # Get the name of the first monster
                    "monster_description": monster.description,  # Get the description of the first monster
                    "character_name": this_game.character.name,  # Character name from character_app
                    "character_stat_STR": this_game.character.strength,  # Character strength stat from character_app
                    "character_stat_INT": this_game.character.intelligence,  # Character intelligence stat from character_app
                    "character_stat_CHA": this_game.character.charisma,  # Character charisma stat from character_app
                    "turn": this_game.turn_count  # Adding turn count to game data
                }
                
                # ERIKA added this to experiment with win/loss logic using a system prompt as trigger
                # If turn_count >= 3, check for win/loss condition
                if this_game.turn_count >= 3:
                    system_prompt = (
                        f"Considering the goal, would you buy the item from {this_game.character.name}? "
                        f"Please respond ONLY with 'Yes' or 'No'."
                    )
                    game_data["system_prompt"] = system_prompt

                    # Generate a response from the assistant, asking if the boss would buy the item
                    response, thread_id = generate_response_with_assistant(system_prompt, game_data, thread_id)

                    logger.debug(f"Assistant's response: {response}")  

                    # Check if the response is "Yes" (win condition)
                    if "yes" in response.lower():
                        return Response({'response': 'You have convinced me, I shall buy your item.', 'thread_id': thread_id, 'turn_number': this_game.turn_count})

                    # If the turn count reaches 10 without a win, trigger loss
                    if this_game.turn_count >= 10:
                        return Response({'response': "I'm afraid your time is up. The answer is no.", 'thread_id': thread_id, 'turn_number': this_game.turn_count})
                
                #OLD CODE RESUMES HERE
                #Generate a response from the assistant using the prompt, game data, and thread_id
                #NOTE: This is a function call to openai.service.py Line:96
                response, thread_id =  generate_response_with_assistant(prompt, game_data, thread_id)
                if this_game.turn_count == 2:
                    this_game.thread_id = thread_id
                    this_game.save()

            else: 
                logger.error("The user is authenticated but not an instance of User.") # Error message handling
                return Response({'error': 'User type mismatch.'}, status=500)

            # Return the assistant's response along with the thread_id (either provided or newly created)
            return Response({'response': response, 'thread_id': thread_id or 'new_thread', 'turn_number':this_game.turn_count})

        except json.JSONDecodeError:
            logger.error("Failed to decode JSON from request body.") # Error message handling
            return Response({'error': 'Invalid JSON'}, status=400)

        except Exception as e:
            logger.error(f"An error occurred: {str(e)}") # Error message handling
            return Response({'error': 'An error occurred while processing your request'}, status=500)

