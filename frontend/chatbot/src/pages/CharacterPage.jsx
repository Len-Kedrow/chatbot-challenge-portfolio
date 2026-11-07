import React, { useState, useEffect } from "react";
import {
  getAllCharacters,
  addCharacter,
  updateCharacter,
  getCharacter,
  deleteCharacter,
} from "../utilities/character.jsx";

function CharacterPage() {
  const [characters, setCharacters] = useState([]);
  const [characterId, setCharacterId] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [strength, setStrength] = useState(6);
  const [charisma, setCharisma] = useState(6);
  const [intelligence, setIntelligence] = useState(6);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    handleGetAllCharacters();
  }, []);

  const handleGetAllCharacters = async () => {
    try {
      const data = await getAllCharacters();
      setCharacters(data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const handleAddCharacter = async () => {
    try {
      const base64Image = await downloadCharacterPNG();
      await addCharacter(characterName, strength, charisma, intelligence, base64Image);
      handleGetAllCharacters(); // Refresh the character list
      resetForm();
    } catch (error) {
      console.error("Error adding character:", error);
    }
  };
  

  const handleUpdateCharacter = async () => {
    try {
      await updateCharacter(
        characterId,
        characterName,
        strength,
        charisma,
        intelligence
      );
      handleGetAllCharacters(); // Refresh the character list
      resetForm();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };

  const handleGetCharacter = async (id) => {
    try {
      const data = await getCharacter(id);
      setCharacterId(data.id);
      setCharacterName(data.name);
      setStrength(data.strength);
      setCharisma(data.charisma);
      setIntelligence(data.intelligence);
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  const handleDeleteCharacter = async (id) => {
    try {
      await deleteCharacter(id);
      handleGetAllCharacters(); // Refresh the character list
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  const resetForm = () => {
    setCharacterId("");
    setCharacterName("");
    setStrength(6);
    setCharisma(6);
    setIntelligence(6);
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Character Management</h1>
      <div>
        <h2>{isEditing ? "Update Character" : "Add Character"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditing ? handleUpdateCharacter() : handleAddCharacter();
          }}
        >
          <div>
            <label>
              Name:
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Strength:
              <input
                type="number"
                value={strength}
                onChange={(e) => setStrength(parseInt(e.target.value))}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Charisma:
              <input
                type="number"
                value={charisma}
                onChange={(e) => setCharisma(parseInt(e.target.value))}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Intelligence:
              <input
                type="number"
                value={intelligence}
                onChange={(e) => setIntelligence(parseInt(e.target.value))}
                required
              />
            </label>
          </div>
          <div>
            <button type="submit">
              {isEditing ? "Update" : "Add"} Character
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div>
        <h2>Character List</h2>
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              {character.name} (Strength: {character.strength}, Charisma:{" "}
              {character.charisma}, Intelligence: {character.intelligence})
              <button onClick={() => handleGetCharacter(character.id)}>
                Edit
              </button>
              <button onClick={() => handleDeleteCharacter(character.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterPage;
