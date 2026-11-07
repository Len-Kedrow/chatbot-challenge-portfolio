import ForwardButton from "../../components/buttons/ForwardButton/ForwardButton";
import BackButton from "../../components/buttons/BackButton/BackButton";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CharacterCreationBox from "../../components/game/CharacterCreationBox";
import CharacterStats from "../../components/game/CharacterStats";
import { addCharacter } from "../../utilities/character";

function CreateAChar() {
  const [createStage, setCreateStage] = useState(0);
  const [characterData, setCharacterData] = useState({
    name: "",
    strength: 1,
    charisma: 1,
    intelligence: 1,
    image: null,
  });
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Handle input changes for character stats and name
  const handleInputChange = (updatedData) => {
    setCharacterData((prev) => ({
      ...prev,
      ...updatedData, // Update the character data with the new stats or name
    }));
  };

  // Capture the character image from the canvas
  const handleImageCapture = async (imageDataURL) => {
    setCharacterData((prev) => ({
      ...prev,
      image: imageDataURL,
    }));
  };

  // Handle the "Next" button click
  const handleNext = async () => {
    if (createStage === 0) {
      setCreateStage(1);
    } else if (createStage === 1) {
      const { name, strength, charisma, intelligence, image } = characterData;

      if (!name || !image) {
        alert("Please complete all fields before submitting.");
        return;
      }

      const characterPayload = {
        name,
        strength: parseInt(strength),
        charisma: parseInt(charisma),
        intelligence: parseInt(intelligence),
        image: image.split(",")[1],
      };

      try {
        await addCharacter(characterPayload);
        console.log("Character added successfully");

        setCreateStage(0);
        setCharacterData({
          name: "",
          strength: 1,
          charisma: 1,
          intelligence: 1,
          image: null,
        });
        navigate("/game");
      } catch (error) {
        console.error("Failed to add character:", error);
        alert("Failed to add character. Please try again.");
      }
    }
  };

  // Handle the "Back" button click
  const handleBack = () => {
    if (createStage === 0) {
      navigate("/game");
    } else {
      setCreateStage(Math.max(0, createStage - 1));
    }
  };

  return (
    <>
      {createStage === 0 && (
        <CharacterCreationBox
          canvasRef={canvasRef}
          onImageCapture={handleImageCapture}
        />
      )}
      {createStage === 1 && (
        <CharacterStats
          characterName={characterData.name}
          strength={characterData.strength}
          charisma={characterData.charisma}
          intelligence={characterData.intelligence}
          onChange={handleInputChange}
          image={characterData.image}
        />
      )}
      <div className="button-group">
        <BackButton
          onClick={handleBack}
          text={createStage === 0 ? "Go to Game" : "Back"}
        />
        <ForwardButton
          onClick={handleNext}
          text={createStage === 0 ? "Start Creation" : "Next"}
        />
      </div>
    </>
  );
}

export default CreateAChar;
