#NOTE made 9 Nov 2026 by Len: This is a file I used to trouble shoot and build out 
# the LLM integration. I did not know what was needed and what was noise so I would 
# cut out sections and paste in this file as a comment. My START/STOP notes could have
# been better documented but I did not intend on this being a demonstration of my work. 
# This was me working underpressure and trouble shoot in a way I could revers, which is my 
# standard way of doing thing 95% of the time. The other 5% is where I do not realize I am working
# underpressure until I try to go back. 

#NOTE
 #####!!!!!START on_text_created()!!!!!###### 
 # REMOVED FROM: openai_service.py due to not being used. 
 # #handle text creation events during streaming
    # def on_text_created(self, text) -> None:
    #     logger.debug(f"on_text_created: {text}")  # DEBUG
        
    #     # Check if the text object has the expected attributes and append to the message
    #     if hasattr(text, 'value'):
    #         self.assistant_message += text.value
    #     elif hasattr(text, 'text'):
    #         self.assistant_message += text.text
    #     else:
    #         logger.error("Text object does not have the expected 'value' or 'text' attribute") 
 #####!!!!!STOP on_text_created()!!!!!##### 
#NOTE
#NOTE
#####!!!!!START!!!!!#####
# class ChatbotResponseView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         try:
#             # Parse JSON body of the prompt from front-end ChatBox.jsx
#             data = json.loads(request.body)
#             prompt = data.get('prompt', '')

#             user = request.user
#             # Debug error
#             logger.debug(f"Authenticated user: {user}")
#             logger.debug(f"Is instance of UserAuth: {isinstance(user, UserAuth)}")

#             if isinstance(user, UserAuth):
                
#                 # # Pulling game data from the related models (game_app, character_app, session_app)
#                 # game_data = {
#                 #     "environment_name": user.game_app.environment_name,  # Pull from game_app
#                 #     "environment_goal": user.game_app.environment_goal,  # Pull from game_app
#                 #     "monster_name": user.game_app.monster_name,  # Pull from game_app
#                 #     "monster_description": user.game_app.monster_description,  # Pull from game_app
#                 #     "character_name": user.character_app.character_name,  # Pull from character_app
#                 #     "character_stat_STR": user.character_app.character_stat_STR,  # Pull from character_app
#                 #     "character_stat_INT": user.character_app.character_stat_INT,  # Pull from character_app
#                 #     "character_stat_CHA": user.character_app.character_stat_CHA,  # Pull from character_app
#                 #     "game_session": user.session_app.game_session,  # Pull from session_app
#                 # }

#                 # Placeholder information
#                 game_data = {
#                     "environment_name": 'fantasy world called Amarantha',
#                     "environment_goal": 'sell a chair',
#                     "monster_name": 'Smaug',
#                     "monster_description": 'dragon living in a cave over a pile of gold',
#                     "character_name": 'Legolas',
#                     "character_stat_STR": '0',
#                     "character_stat_INT": '2',
#                     "character_stat_CHA": '4',
#                     "game_session": 'no conversation recorded yet'
#                 }

#                 # Log the user data (remove later to be careful about logging sensitive data)
#                 logger.debug(f"User data for prompt: {game_data}")

#                 # Modify the prompt to include game data
#                 personalized_prompt = (
#                     f"User Information: {game_data}. "
#                     f"Now respond to the user's prompt: {prompt}"
#                 )

#                 # Pass both the personalized prompt and user data to the generate_response function
#                 # response = generate_response(personalized_prompt, game_data) #using model no assistant
#                 response = generate_response_with_assistant(prompt, game_data, "asst_sBw8IU9cXQ8J7RytPMSTDH4Z") #using assistant

#             else:
#                 logger.error("The user is authenticated but not an instance of UserAuth.") # Debug error
#                 return Response({'error': 'User type mismatch.'}, status=500)

#             return Response({'response': response})

#         except json.JSONDecodeError:
#             # Debug error
#             logger.error("Failed to decode JSON from request body.")
#             return Response({'error': 'Invalid JSON'}, status=400)

#         except Exception as e:
#             # Debug error
#             logger.error(f"An error occurred: {str(e)}")
#             return Response({'error': 'An error occurred while processing your request'}, status=500)
#####!!!!!STOP @!!!!!#####
#NOTE
#NOTE
 ###########!!!!!!START1-1 REMOVED FROM openai_service.py afer Len wired up game_app data!!!!#####
#######!!!!!!!START1 KEEP UNTIL MEMORY IS WORKING THEN DELETE!!!!####
                # Placeholder game data (will be pulled from related models)
                # game_data = {
                #     "environment_name": 'fantasy world called Montopia',
                #     "environment_goal": 'sell a chair',
                #     "monster_name": 'Dorcagon',
                #     "monster_description": 'dragon living in a cave over a pile of gold',
                #     "character_name": 'Legolas',
                #     "character_stat_STR": '0',
                #     "character_stat_INT": '2',
                #     "character_stat_CHA": '4',
                #     "game_conversation": 'no conversation recorded yet'
                # }
                ########!!!!!!!!STOP KEEP UNTIL MEMORY IS WORKING THEN DELETE!!!!!!!######
               ###########!!!!!!STOP REMOVED FROM openai_service.py afer Len wired up game_app data!!!!##### 
#NOTE
#NOTE
###!!!START: This was removed from openai_service.py Line 197 by Len!!!!!#########
# THIS WORKS IF CONNECTED DIRECTLY TO THE MODEL


# def generate_response(prompt, game_data, character=True):
#     try:
#         # Debug user data
#         logger.debug(f"game_data received: {game_data}")

#         # Fetch game data
#         environment_name = game_data.get('environment_name', 'fantasy world called Amarantha')
#         environment_goal = game_data.get('environment_goal', 'sell a chair')
#         monster_name = game_data.get('monster_name', 'Smaug')
#         monster_description = game_data.get('monster_description', 'dragon living in a cave over a pile of gold')
#         character_name = game_data.get('character_name', 'Legolas')
#         character_stat_STR = game_data.get('character_stat_STR', '0')
#         character_stat_INT = game_data.get('character_stat_INT', '2')
#         character_stat_CHA = game_data.get('character_stat_CHA', '4')
#         game_session = game_data.get('game_session', 'no conversation recorded yet') #probably called as a function above

#         # This creates the system message containing the full game session info
#         system_message = (
#             f"You are {monster_name}, a {monster_description} living in the {environment_name}. "
#             f"The user's character name is {character_name}, with the goal: {environment_goal}. "
#             f"The user has the following stats: Strength {character_stat_STR}, Intelligence {character_stat_INT}, Charisma {character_stat_CHA}. "
#             f"Do not mention these stats directly to the user. "
#             f"Current conversation: {game_session}. "
#         )

#         if not character:
#             # Modified system message for system prompts
#             system_message += "Considering the goal, would you buy the item from the user? Respond ONLY with 'Yes' or 'No'."

#         # Sending the full prompt to OpenAI
#         response = openai.chat.completions.create(
#             model="gpt-4o-mini", 
#             messages=[
#                 {"role": "system", "content": system_message},
#                 {"role": "user", "content": prompt},
#             ],
#             temperature=0.7,
#             stream=False,
#         )

#         # Returns the generated response
#         return response.choices[0].message.content

#     except Exception as e:
#         logger.error(f"An error occurred in generate_response: {str(e)}")
#         return f"Error: {str(e)}"
###!!!STOP: This was removed from openai_service.py Line 197 by Len!!!!!#########
#NOTE