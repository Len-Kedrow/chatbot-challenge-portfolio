import React, { useState, useEffect } from "react";
import "./CharacterStats.css";

function CharacterStats({
  characterName,
  strength,
  charisma,
  intelligence,
  onChange,
  image,
}) {
  const [stats, setStats] = useState({
    name: characterName || "",
    strength: parseInt(strength) || 1,
    charisma: parseInt(charisma) || 1,
    intelligence: parseInt(intelligence) || 1,
  });

  const [globalPoints, setGlobalPoints] = useState(5); // Total points to allocate

  // Handle name change
  const handleNameChange = (event) => {
    const { value } = event.target;
    setStats((prevStats) => ({
      ...prevStats,
      name: value,
    }));
    onChange({ ...stats, name: value }); // Notify parent of the name change
  };

  // Handle stat change (increase or decrease)
  const handleStatChange = (statName, value) => {
    const newStats = {
      ...stats,
      [statName]: Math.min(Math.max(parseInt(value) || 0, 0), 6), // Ensure value is between 0 and 6
    };
    setStats(newStats);
    onChange(newStats); // Notify parent of the stat change
  };

  // Increase stat points
  const handleAddPoint = (statName) => {
    if (globalPoints > 0 && stats[statName] < 6) {
      setGlobalPoints((prev) => prev - 1);
      const newStats = {
        ...stats,
        [statName]: stats[statName] + 1,
      };
      setStats(newStats);
      onChange(newStats); // Notify parent of the stat change
    }
  };

  // Decrease stat points
  const handleSubtractPoint = (statName) => {
    if (stats[statName] > 1) {
      setGlobalPoints((prev) => prev + 1);
      const newStats = {
        ...stats,
        [statName]: stats[statName] - 1,
      };
      setStats(newStats);
      onChange(newStats); // Notify parent of the stat change
    }
  };


  return (
    <div className="character-stats__box">
      <h1 className="character-stats__title">Customize your Stats</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Display the character image */}
        <div className="character-stats__image-container">
          <img src={image} alt="Character Image" />
        </div>

        {/* Name input */}
        <div className="character-stats__input-container">
          <label htmlFor="nameInput" className="character-stats__name-label">
            Name:
            <input
              id="nameInput"
              className="character-stats__input"
              type="text"
              name="name"
              value={stats.name}
              onChange={handleNameChange}
              required
            />
          </label>
        </div>

        {/* Remaining points */}
        <div className="character-stats__points">
          <h2>Remaining Stat Points: {globalPoints}</h2>
        </div>

        {/* Stats container */}
        <div className="character-stats__container">
          {/* Intelligence stat */}
          <div className="character-stats__stat">
            <span className="character-stats__label">Intelligence: {stats.intelligence}</span>
            <div className="character-stats__buttons">
              <button
                className="character-stats__button"
                type="button"
                onClick={() => handleSubtractPoint("intelligence")}
                disabled={stats.intelligence <= 1}
              >
                -
              </button>
              <button
                className="character-stats__button"
                type="button"
                onClick={() => handleAddPoint("intelligence")}
                disabled={globalPoints === 0 || stats.intelligence >= 6}
              >
                +
              </button>
            </div>
          </div>

          {/* Strength stat */}
          <div className="character-stats__stat">
            <span className="character-stats__label">Strength: {stats.strength}</span>
            <div className="character-stats__buttons">
              <button
                className="character-stats__button"
                type="button"
                onClick={() => handleSubtractPoint("strength")}
                disabled={stats.strength <= 1}
              >
                -
              </button>
              <button
                className="character-stats__button"
                type="button"
                onClick={() => handleAddPoint("strength")}
                disabled={globalPoints === 0 || stats.strength >= 6}
              >
                +
              </button>
            </div>
          </div>

          {/* Charisma stat */}
          <div className="character-stats__stat">
            <span className="character-stats__label">Charisma: {stats.charisma}</span>
            <div className="character-stats__buttons">
              <button
                className="character-stats__button"
                type="button"
                onClick={() => handleSubtractPoint("charisma")}
                disabled={stats.charisma <= 1}
              >
                -
              </button>
              <button
                className="character-stats__button"
                type="button"
                onClick={() => handleAddPoint("charisma")}
                disabled={globalPoints === 0 || stats.charisma >= 6}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CharacterStats;
