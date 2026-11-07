import React, { useState, useEffect } from "react";
import {
  getAllCharacters,
  addCharacter,
  deleteCharacter,
} from "../../utilities/character";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col, Row } from "react-bootstrap";
import './CharSelect.css';

const CharacterSelection = ({ onSelect }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const fetchedChars = await getAllCharacters();
        setCharacters(fetchedChars);
        setLoading(false);
      } catch (err) {
        setError("Failed to load characters");
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  const handleSelect = (characterData) => {
    onSelect(characterData);
  };

  const handleCreateNewCharacter = () => {
    navigate("/game/character-creation"); // Navigate to the character creation page
  };

  // Handle character deletion
  const handleDeleteCharacter = async (id) => {
    try {
      await deleteCharacter(id);
      // Remove the deleted character from the state
      setCharacters((prevCharacters) =>
        prevCharacters.filter((char) => char.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete character:", error);
      setError("Failed to delete character");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (characters.length === 0) {
    return (
      <div className="character-selection">
        <h2>No Characters Available</h2>
        <p>Create a new character below:</p>
        <button onClick={handleCreateNewCharacter}>Create New Character</button>
      </div>
    );
  }



  return (
    <div className="character-selection">
      <h2>Select Your Character:</h2>
      <Row>
        {characters.map((char) => (
          <Col md={12} key={char.id} className="mb-3">
            <Card className="character-card">
              <Card.Img
                className="card-img-left"
                src={`http://127.0.0.1:8000${char.image}`}
                alt={char.name}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold">{char.name}</Card.Title>
                  <Card.Text>Strength: {char.strength} Charisma: {char.charisma} Intelligence: {char.intelligence}</Card.Text>
                </div>
                <div className="text-center">
                  <Button
                    onClick={() => handleSelect(char)}
                    variant="success"
                    className="me-2"
                  >
                    Select
                  </Button>
                  <Button
                    onClick={() => handleDeleteCharacter(char.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {characters.length < 4 && (
        <Button onClick={handleCreateNewCharacter}>Create New Character</Button>
      )}
    </div>
  );
};

export default CharacterSelection;




//   return (
//     <div className="character-selection">
//       <h2>Select Your Character:</h2>
//       <ul>
//         {characters.map((char, index) => (
//           <li key={index} style={{ marginBottom: "20px" }}>
//             {/* Display character image */}
//             <img
//               src={`http://127.0.0.1:8000${char.image}`} // Prepend the base URL
//               alt={char.name}
//               style={{ width: "100px", height: "100px", objectFit: "cover" }}
//             />
//             {/* Display character name */}
//             <h3>{char.name}</h3>
//             {/* Display character stats */}
//             <p>Strength: {char.strength}</p>
//             <p>Charisma: {char.charisma}</p>
//             <p>Intelligence: {char.intelligence}</p>
//             {/* Select character button */}
//             <button
//               onClick={() => handleSelect(char)}
//               style={{ backgroundColor: "#4CAF50", color: "white" }}
//             >
//               Select
//             </button>
//             {/* Delete character button */}
//             <button
//               onClick={() => handleDeleteCharacter(char.id)}
//               style={{
//                 marginLeft: "10px",
//                 backgroundColor: "#f44336",
//                 color: "white",
//               }}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Conditionally render the "Create New Character" button if there are fewer than 4 characters */}
//       {characters.length < 4 && (
//         <button onClick={handleCreateNewCharacter}>Create New Character</button>
//       )}
//     </div>
//   );
// };

// export default CharacterSelection;
