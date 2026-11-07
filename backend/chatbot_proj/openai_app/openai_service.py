import os
import logging

# Import necessary modules from OpenAI and dotenv
import openai
from openai import AssistantEventHandler
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# OpenAI references:
# https://platform.openai.com/docs/api-reference/chat

# Purpose:
# This module interacts with the OpenAI API:
# It takes a prompt and game data to generate a response from a trained model.
# The response is returned to the Django view.


# Set up logging configuration: calling single logging config file to not over write other file loggers. 
from .logging_config import logger









# OpenAI API key and assistant ID
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_ASSISTANT_ID = os.getenv('OPENAI_ASSISTANT_ID')


# Custom event handler to manage streaming responses from the assistant
class MyEventHandler(AssistantEventHandler):
    def __init__(self):
        super().__init__() 
        self.assistant_message = ""  # Store the assistant's response as it is received

    # handle text delta updates during streaming
    def on_text_delta(self, delta, snapshot) -> None:
        #logger.debug(f"on_text_delta: {delta}")  # DEBUG

        # Check if the delta object has the expected attributes and append to the message
        if hasattr(delta, 'value'):
            self.assistant_message += delta.value
        elif hasattr(delta, 'text'):
            self.assistant_message += delta.text
        else:
            logger.error("Delta object does not have the expected 'value' or 'text' attribute")

    # handle the completion of text streaming
    def on_text_done(self, text) -> None:
        logger.debug(f"on_text_done: {text}")  # DEBUG

        #!!!!! NOTE: WE SHOULD ADD FINALIZATION LOGIC HERE IF NEEDED, JUST IN CASE
        

    # handle exceptions that occur during streaming
    def on_exception(self, exception: Exception) -> None:
        logger.error(f"Exception during streaming: {str(exception)}")  # DEBUG

    # retrieve the final response from the assistant
    def get_response(self) -> str:
        return self.assistant_message




# Create a new conversation thread (ASSISTANT)
def create_new_thread():
    try:
        # Attempt to create a new thread using the OpenAI API
        thread = openai.beta.threads.create()
        logger.debug(f"tread_id: {thread}")  # DEBUG

        return thread.id  # Returns the thread ID like "thread_id": "new_thread"
    
    except Exception as e:
        # Error message handling
        logger.error(f"Error creating thread: {str(e)}")
        return None  # Return None if thread creation fails


# Generate a response from the assistant using game data and a prompt
def generate_response_with_assistant(prompt, game_data, thread_id=None):
    try:
        logger.debug("Starting generate_response_with_assistant")  # DEBUG
        
        # Check if a thread ID is provided; if not, create a new thread
        if not thread_id:
            thread_id = create_new_thread()
            if not thread_id:
                return "Error: Could not create a new thread."
            
        logger.debug(f"Thread ID: {thread_id}")  # DEBUG
        logger.debug(f"Prompt: {prompt}")  # DEBUG
        logger.debug(f"Game Data: {game_data}")  # DEBUG
        this_game_tread_id = thread_id


        # Extract game data elements with default values
        environment_name = game_data.get('environment_name', 'fantasy world called Amarantha')
        environment_goal = game_data.get('environment_goal', 'sell a chair')
        monster_name = game_data.get('monster_name', 'Smaug')
        monster_description = game_data.get('monster_description', 'dragon living in a cave over a pile of gold')
        character_name = game_data.get('character_name', 'Legolas')
        character_stat_STR = game_data.get('character_stat_STR', '0')
        character_stat_INT = game_data.get('character_stat_INT', '2')
        character_stat_CHA = game_data.get('character_stat_CHA', '4')
        turn_count = game_data.get('turn')

        # Construct the system message using the extracted game data
        system_message = (
            f"You are {monster_name}, a {monster_description} living in the {environment_name}. "
            f"The user's character name is {character_name}, with the goal: {environment_goal}. "
            f"The user has the following stats: Strength {character_stat_STR}, Intelligence {character_stat_INT}, Charisma {character_stat_CHA}. "
            f"Do not mention these stats directly to the user. "
            f"Currently, it is turn {turn_count}. "
            f"Refer to the user by their character name, but limit how many times you call the user by their name. "
            f"Include narration in bold and italics for added effect, and, while narrating only, refer to yourself in the third person and by your name. "
            f"However, for direct dialogue, refer to yourself in the first person and stay in character. Use I statements when talking to the player. "
            f"Maintain a consistent tone that matches the character you’re portraying. Adjust your responses to reflect the character’s personality and the current situation. "
            f"Respond to the player’s actions in a way that keeps the conversation dynamic. Avoid long-winded responses unless they serve a specific narrative purpose. "
            f"As the turns progress, acknowledge the player’s persistence and become more open to persuasion, particularly if their stats align with the argument. "
            f"Tailor your responses based on the player’s stat levels. Acknowledge high stats with respect and deference, and address low stats with skepticism or dismissiveness. "
            f"Avoid repeating phrases or concepts unless necessary for emphasis or clarity. Vary your language to keep the interaction engaging. "
            f"Inject appropriate humor or wit when the situation allows, but ensure it aligns with the character’s persona and the context of the interaction. "
            f"If a sensitive topic is brought up, redirect the conversation to a safer, more neutral topic while maintaining in-character behavior. "
            f"When faced with threats or aggressive actions from the player, acknowledge the aggression but steer the interaction towards a non-violent resolution."
        )


        # NOTE: ONCE WE DEAL WITH TURNS, THIS IS WHERE WE DEAL WITH ADDING AN EXTRA MESSAGE TO THE PROMPT
        ## HOWEVER, we should call it something else to make sure that we add logic to identify win or loss because atm it will post with the reply in the chat 
        
        # Add system_prompt to the system message if present
        if 'system_prompt' in game_data:
            system_message += game_data['system_prompt']


        # Combine the system message and the user prompt
        combined_message = f"{system_message}\n\n{prompt}"
        
        logger.debug(f"Combined message: {combined_message}")  # DEBUG

        # Add the user's message to the thread in the OpenAI API
        openai.beta.threads.messages.create(
            thread_id=this_game_tread_id,
            role="user",
            content=combined_message
        )

        logger.debug(f"Message added to thread {thread_id}")  # DEBUG

        # Create an instance of the custom event handler to manage streaming responses
        event_handler = MyEventHandler()

        # Stream the assistant's response using the event handler
        with openai.beta.threads.runs.stream(
            thread_id=thread_id,
            assistant_id=os.getenv('OPENAI_ASSISTANT_ID'), # assistant ID
            event_handler=event_handler  # event handler will manage the response
        ) as stream:
            
            logger.debug("Streaming response")  # DEBUG 
            stream.until_done()  # Wait until the streaming is complete

        # Retrieve the final response from the event handler
        assistant_message = event_handler.get_response()

        #This log shows you the full response from the llm. 
        logger.debug(f"Full response from assistant: {assistant_message}")  # DEBUG
        logger.debug(f"Current tread_id from assistant: {this_game_tread_id}")
        # Return the assistant's response to the caller
        #This maybe where we are dropping the thread_id
        return assistant_message, this_game_tread_id
    
    except Exception as e:
        logger.error(f"An error occurred in generate_response_with_assistant: {str(e)}") # Error message handling
        return f"Error: {str(e)}"  # Return the error message as the response
