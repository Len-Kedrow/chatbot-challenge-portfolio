import React, { useEffect, useState } from "react";
import CharacterSelection from "../../components/game/CharSelect";
import EnvironmentSetup from "../../components/game/EnvironSelect";
import PlayButton from "../../components/buttons/PlayButton/PlayButton";
import "./Game.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton/BackButton";
import TopOverlay from "../../components/TopOverlay";
import LoadingTransition from "../../components/LoadingTransition";

const Game = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState("Fantasy");
  const navigate = useNavigate();

  const handleCharacterSelect = (characterData) => {
    setSelectedCharacter(characterData);
  };

  const handleEnvironmentChange = (environment) => {
    setSelectedEnvironment(environment);
  };

  const handlePlay = () => {
    if (!selectedCharacter || !selectedEnvironment) {
      console.error("Character or Environment not selected");
      return;
    }
    // Directly navigate to the chat-window and pass selectedCharacter and selectedEnvironment as state
    navigate("/chat-window/", {
      state: { selectedEnvironment, selectedCharacter },
    });
  };

  return (
    <div id="game-screen">
      <TopOverlay />
      <h1 style={{ fontFamily: 'Mouse Memoirs', fontSize: "300%" }}>Let's Play Deal or Dragon!</h1>

      {!selectedCharacter && (
        <>
          <CharacterSelection onSelect={handleCharacterSelect} />
        </>
      )}

      {selectedCharacter && (
        <>
          <EnvironmentSetup onChange={handleEnvironmentChange} />
          <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
            <PlayButton onClick={handlePlay} />
          </div>
        </>
      )}
      <div className="button-group">
        <BackButton onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default Game;
