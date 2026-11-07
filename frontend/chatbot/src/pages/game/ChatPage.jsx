import React, { useState, useEffect } from 'react';
import Chatbox from "../../components/ChatBox.jsx";
import './ChatPage.css'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { getCharacter } from '../../utilities/character.jsx';
import dragonBanner from '../../assets/game/game_banner_dragon.svg';
import characterFrame from '../../assets/character_frame.svg';
import EnergyBarTurnComponent from '../../components/game/EnergyBarTurnComponent';
import CloseXButton from '../../components/buttons/CloseButton/CloseXButton'; // can't get this button to appear in front of the stupid banner
import WinPopup from '../../components/game/WinPopup.jsx';
import LossPopup from '../../components/game/LossPopup.jsx';
import GeneralPopup from '../../components/GeneralPopup.jsx';
import { Button } from 'react-bootstrap';
import { setUserInfo } from '../../utilities/user_auth.jsx';

import api from '../../utilities/character.jsx';


function ChatPage() {
  const navigate = useNavigate()
  const location = useLocation();
  const { gameState } = location.state || {}

  const { user, setUser } = useOutletContext()

  console.log(user.wins)

  //changing game state to character and environment data -Len 
  const { selectedCharacter, selectedEnvironment } = location.state || {};

  const [characterImage, setCharacterImage] = useState(null);  // character image
  const [characterDetails, setCharacterDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quit, setQuit] = useState(false)
  const [turnNumber, setTurnNumber] = useState(0);
  const [showWinPopup, setShowWinPopup] = useState(false);  // win popup
  const [showLossPopup, setShowLossPopup] = useState(false); // loss popup

  // Log the gameState to check if it's correctly passed
  //console.log('Game State:', gameState);
  console.log('Selected Character ChatPage.jsx:', selectedCharacter);
  console.log('Selected Environment  ChatPage.jsx:', selectedEnvironment);

  useEffect(() => {
    // Use selectedCharacter for the character ID to fetch character details using getCharacter
    if (selectedCharacter) {
      getCharacter(selectedCharacter.id)
        .then(characterData => {
          // Set the character image and details
          setCharacterImage(`http://127.0.0.1:8000${characterData.image}`);
          setCharacterDetails(characterData);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching character data:", err);
          setError("Failed to load character data");
          setLoading(false);
        });
    }
  }, [selectedCharacter]);

  /*!!!!!!!!!!!!!!!START Len commented out useEffect useing GameState!!!!!!!!!!!!!
    // useEffect(() => {
    //   // use gameState for the character ID to fetch char details using getCharacter
    //   if (gameState?.character) {
    //     getCharacter(gameState.character)
    //       .then(characterData => {
    //         console.log("Character Data:", characterData);
  
    //         // Set the character image and details
    //         setCharacterImage(`http://127.0.0.1:8000${characterData.image}`);
    //         setCharacterDetails(characterData);
    //         setLoading(false);
    //       })
    //       .catch(err => {
    //         console.error("Error fetching character data:", err);
    //         setError("Failed to load character data");
    //         setLoading(false);
    //       });
    //   }
    // }, [gameState]);
  /*!!!!!!!!!!!!!!!END Len commented out useEffect useing GameState!!!!!!!!!!!!!*/

  const handleTurnChange = (newTurnNumber, response) => {
    setTurnNumber(newTurnNumber);

    // Check for win or loss response
    if (response.includes("You have convinced me, I shall buy your item")) {
      updateWinLoss(true)
      setShowWinPopup(true);  // Trigger win popup
    } else if (response.includes("I'm afraid your time is up. The answer is no")) {
      updateWinLoss(false)
      setShowLossPopup(true);  // Trigger loss popup
    }
  };

  const updateWinLoss = async (winBool) => {
    if (winBool) {
      setUser(await setUserInfo("wins", user.wins + 1))
      await api.put(`${characterDetails.id}/`, { "wins": characterDetails.wins + 1 })
    }
    else {
      setUser(await setUserInfo("losses", user.wins + 1))
      await api.put(`${characterDetails.id}/`, { "losses": characterDetails.losses + 1 })
    }
  }

  const closePopup = () => {
    setShowWinPopup(false);
    setShowLossPopup(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className='quit-button'>
        <CloseXButton onClick={() => setQuit(true)} id="chatpage-close" />
      </div>
      <div className="chat-page-container">

        {/* Banner with character image overlay and Close button */}
        <div className="banner-container">
          <img src={dragonBanner} alt="Environment Banner" className="banner-image" />

          <div className="character-container">
            <div className="character-image-frame">
              <img src={characterImage} alt="Character" className="character-image" />
              <img src={characterFrame} alt="Character Frame" className="character-frame" />
            </div>
            <div className="character-details">
              <h3>{characterDetails.name}</h3>
              <p>Strength: {characterDetails.strength}</p>
              <p>Charisma: {characterDetails.charisma}</p>
              <p>Intelligence: {characterDetails.intelligence}</p>
            </div>
          </div>

          {/* Energy Bar Component */}
          <div className="energy-bar">
            <EnergyBarTurnComponent turn={turnNumber} />
          </div>
        </div>

        {/* Chat box */}
        <div id="chat-box">
          <Chatbox
            selectedCharacter={selectedCharacter}
            selectedEnvironment={selectedEnvironment}
            onTurnChange={handleTurnChange} // Pass the turn and response to Chatbox
          />
        </div>

        {/* Win or Loss Popup */}
        {showWinPopup && <WinPopup onClose={closePopup} />}
        {showLossPopup && <LossPopup onClose={closePopup} />}
      </div>
      {quit ?
        <GeneralPopup onClose={() => setQuit(false)} id={"quit-popup"}>
          <h1>Quit game?</h1>
          <div id="game-quit-yes-no">
            <Button
              onClick={() => navigate("/")}
              variant="success"
              style={{ width: "30%" }}
            >Yes</Button>
            <Button
              onClick={() => setQuit(false)}
              variant="danger"
              style={{ width: "30%" }}
            >No</Button>
          </div>
        </GeneralPopup>
        :
        undefined}
    </>
  );
}

export default ChatPage;
