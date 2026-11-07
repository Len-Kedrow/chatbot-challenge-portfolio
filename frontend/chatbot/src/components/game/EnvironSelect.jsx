import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./EnvironSelect.css";
import dragonBanner from "../../assets/game/game_banner_dragon.svg";

const EnvironmentSetup = ({ onChange }) => {
  const [currentEnvironment, setCurrentEnvironment] = useState("Fantasy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const environments = {
    Fantasy: { Theme: "Fantasy", Location: "Montopia", Goal: [1, 2, 3] },
    Modern: { Theme: "Modern", Location: "Citnilla", Goal: [7, 8, 9] },
  };

  const monsters = {
    Fantasy: {
      Name: "Dorcagon",
      Location: "Montopia",
      Description:
        "Dorcagon is a dragon perched up on their mound of gold and magical items.",
    },
    Modern: {
      Name: "Brandon",
      Location: "Citnilla",
      Description:
        "Brandon is the master of the calculator, which he uses to control the worlds pastry supply",
    },
  };

  const handleNextEnvironment = () => {
    const keys = Object.keys(environments);
    const currentIndex = keys.indexOf(currentEnvironment);
    const nextIndex = (currentIndex + 1) % keys.length;
    setCurrentEnvironment(keys[nextIndex]);
    onChange(keys[nextIndex]);
  };

  const handlePreviousEnvironment = () => {
    const keys = Object.keys(environments);
    const currentIndex = keys.indexOf(currentEnvironment);
    const previousIndex = (currentIndex - 1 + keys.length) % keys.length;
    setCurrentEnvironment(keys[previousIndex]);
    onChange(keys[previousIndex]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="environment-setup">
      <h2>Choose Your Environment:</h2>
      <div className="carousel-container">
        <Button className="carousel-button" onClick={handlePreviousEnvironment}>
          &lt;
        </Button>

        <Card className="environment-card">
          <Card.Img
            className="card-img-left"
            variant="top"
            src={dragonBanner}
            alt="Environment"
          />
          <Card.Body>
            <Card.Title>
              Theme: {environments[currentEnvironment].Theme}
            </Card.Title>
            <Card.Text>
              Location: {environments[currentEnvironment].Location}
            </Card.Text>
            <Card.Text>
              Description: {monsters[currentEnvironment].Name}:{" "}
              {monsters[currentEnvironment].Description}
            </Card.Text>
          </Card.Body>
        </Card>

        <Button className="carousel-button" onClick={handleNextEnvironment}>
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default EnvironmentSetup;
