import React, { useState, useEffect, useRef } from 'react';
import chatbotService from '../utilities/chatbotService';
import './ChatBox.css'
import { marked } from 'marked';
import { startGame } from "../utilities/game";

// BASE CHATBOX FOR THE GAME, This will only handle the displayed data. All othrer funcionality will be handled in chatbotServices
const Chatbox = ({ selectedCharacter, selectedEnvironment, onTurnChange }) => {
    const [prompt, setPrompt] = useState(''); // captures the users input every turn
    const [conversation, setConversation] = useState([]); // list to manage the conversation history, even numbered items are player input, odd numbered items are api responses.
    const [gameState, setGameState] = useState({});
    const conversationEndRef = useRef(null); // Ref to keep track of the end of the conversation for scrolling purposes
    
    

    //inialize thread_id and turn_number before a api call is made
    const [turnNumber, setTurnNumber] = useState(0); // Initialize turn number state at 0 for full bar
    const [threadId, setThreadId] = useState(""); // Initialize thread ID state

    
    useEffect(() => {
        const startGameEffect = async () => {
            if (!selectedCharacter || !selectedEnvironment) {
                console.error("Character or Environment not selected");
                return;
            }
            try {
                const data = await startGame(selectedEnvironment, selectedCharacter);
                setGameState(data);
            } catch (error) {
                console.error("Error starting game:", error);
            }
        };
    
        startGameEffect();
    }, [selectedCharacter, selectedEnvironment]);
    

      // Effect to scroll to the latest message when conversation updates
    useEffect(() => {
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]);

    
    // Handles the form submission to send user input to the back end
    const handleSubmit = async (e) => {
        e.preventDefault();

        // User's input into the conversation state
        setConversation(prev => [...prev, { role: 'user', content: prompt }]);
        
        // Clear input field after user submits so they can write again
        setPrompt('');

        //package with turn info. 
        const turnInformation = {
            prompt,
            "thread_id": threadId,
        };

        console.log("User input: ", turnInformation, "Turn number", turnNumber);

        // Send the user's prompt to the chatbot service and recieve api response
        try {
            await chatbotService.getChatbotResponse(turnInformation, gameState.id, (data) => {
                
                setThreadId(data.thread_id);

                // Log to see if turn number is being set correctly, remove later
                console.log("Setting turn number to:", data.turn_number);

                setTurnNumber(data.turn_number);

                // Passing  the turn number and the full response to ChatPage for win/loss and energybar
                onTurnChange(data.turn_number, data.response);
            
                // Parse the API response as Markdown and convert to HTML
                const formattedResponse = marked(data.response);

                // Add the API response to the conversation state
                setConversation(prev => [...prev, { role: 'assistant', content: formattedResponse }]);
            });
        } catch (error) {
            console.error('Error getting chatbot response:', error);
        }
    };

    // for longer input and auto-resizing of the textarea
    const handleInputChange = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`; // height based on scroll height with a max limit
        setPrompt(textarea.value); // this replaces the previous embedded function of onChange={(e) => setPrompt(e.target.value)}
    };



    return (
        <div className="chatbox-container">
            <div className="chatbox-header">
                Here's your chance to convince me!
            </div>
            <div className="chatbox-messages">
                {conversation.map((msg, index) => (
                    <div key={index} className={`chatbox-message ${msg.role}`}>
                    {/* Render Markdown content */}
                    <p dangerouslySetInnerHTML={{ __html: msg.content }} /> {/* render formatted HTML */}
                    </div>
                ))}
                <div ref={conversationEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="chatbox-form">
                <textarea
                    value={prompt}
                    onChange={handleInputChange}
                    placeholder="Your move..."
                    className="chatbox-input"
                    rows={1}
                />
                <button type="submit" className="chatbox-send-button">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbox;


