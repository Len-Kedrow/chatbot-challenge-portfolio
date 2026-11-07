import { api } from '../utilities/user_auth';


const chatbotService = {
    // Get the chatbot response
    async getChatbotResponse(turnInformation, game_id, onData) {
        try {
            // Fetch Auth Token from localStorage for backend authentication and user data management.
            const token = localStorage.getItem('token');
            if (!token) {
                // Throw an error if no token is found
                throw new Error('No authentication token found');
            }
                
                console.log("turn info input to chant bot: ", turnInformation)   
            // Function to take a turn in the game and send a prompt to the backend
            const takeTurn = async (turnInformation, game_id) => {
                const response = await api.put(`games/game-turn/${game_id}/`, {
                    
                    "prompt": turnInformation.prompt,
                    "thread_id": turnInformation.thread_id

                });
                
                return response;
            };

            const response = await takeTurn(turnInformation, game_id);
            onData(response.data);  //send api respons, turn_number and token_id to ChatBox

        } catch (error) {
            console.error("Error getting chatbot response", error); // Debug error

            // Fallback response in case of failure
            onData({ response: "Sorry, something went wrong. Please try again later." });
        }
    }
};

export default chatbotService;
