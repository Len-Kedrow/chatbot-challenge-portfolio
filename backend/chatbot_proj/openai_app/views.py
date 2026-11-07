from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model

import json


from user_app.models import User # import the User model from user_app for user authentication
from user_app.views import TokenReq # import TokenReq class from user_app for user authentication

#import helperfunctions
from game_app.game_helper_functions import get_current_game

# Import function to generate a response
# from .openai_service import generate_response # direct model
from openai_app.openai_service import generate_response_with_assistant # from the assistant 

# Set up logging configuration: calling single logging config file to not over write other file loggers. 
from .logging_config import logger

# Custom view class that handles chatbot responses, inheriting from TokenReq for authentication
class ChatbotResponseView(TokenReq):

    def post(self, request, *args, **kwargs):
        try:
            # Parse the JSON body from the incoming POST request to extract the prompt and thread_id
            logger.debug("START POST CALL")
            data = json.loads(request.body)
            prompt = data.get('prompt', '')  # Get the prompt provided by the user
            thread_id = data.get('thread_id', None)  # Get the thread_id, if provided
            character = data.get("character")
            
            logger.debug(f"DATA: {data}")
            # Retrieve the authenticated user from the request
            user = request.user
            #logger.debug(f"Authenticated user: {user}")  # DEBUG
            #logger.debug(f"Is instance of UserAuth: {isinstance(user, User)}")  # DEBUG

            # Check if the authenticated user is an instance of the custom UserAuth model
            if isinstance(user, User):

                # Pulling game data from the related models (game_app, character_app, session_app)
                query_data = request.data.copy()
                logger.debug(f"data2: {query_data}")
                #Len added the above line get the game inf passed in post request
                
                ###START: The below code is Eriak's original code with the proper calls to the other apps
                ###based on the code Len wrote in game_app. 
                this_game=get_current_game(character_str=character, user_str=user.email)
                game_data = {
                    "environment_name": this_game.location,  # Pull from game_app
                    "environment_goal": this_game.goal,  # Pull from game_app
                    "monster_name": this_game.monster,  # Pull from game_app
                    "monster_description": this_game.description ,  # Pull from game_app
                    "character_name": this_game.character,  # Pull from character_app
                    "character_stat_STR": (this_game.character).strength,  # Pull from character_app
                    "character_stat_INT": (this_game.character).intelligence,  # Pull from character_app
                    "character_stat_CHA": (this_game.character).charisma,  # Pull from character_app
                    "turn": this_game.turn_count  # Retrieve the current turn count
                    #conversation 
                }
                ###STOP: This is the end of Erika's original code that Len modified to call game_app info.

                logger.debug(f"Game Data from get_current_game: {game_data}")  # DEBUG

                # Generate a response from the assistant using the prompt, game data, and thread_id
                #NOTE: This is a function call to openai.service.py Line:96
                response, thread_id =  generate_response_with_assistant(prompt, game_data, thread_id)
                
                logger.debug(f"response from generate_response_with_assistant {response}")
                logger.debug(f"thread_id from generate_response...{thread_id}")


            else: 
                logger.error("The user is authenticated but not an instance of User.") # Error message handling
                return Response({'error': 'User type mismatch.'}, status=500)

            # Return the assistant's response along with the thread_id (either provided or newly created)
            return Response({'response': response, 'thread_id': thread_id or 'bobs_thread'})

        except json.JSONDecodeError:
            logger.error("Failed to decode JSON from request body.") # Error message handling
            return Response({'error': 'Invalid JSON'}, status=400)

        except Exception as e:
            logger.error(f"An error occurred: {str(e)}") # Error message handling
            return Response({'error': 'An error occurred while processing your request'}, status=500)
