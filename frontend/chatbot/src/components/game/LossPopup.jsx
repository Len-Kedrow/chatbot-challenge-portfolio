import React from 'react';
import './LossPopup.css';
import GeneralPopup from '../GeneralPopup';
import { useNavigate } from 'react-router-dom';

const LossPopup = ({ onClose }) => {
    const navigate = useNavigate()

    return (
        <GeneralPopup id="loss-popup" onClose={onClose}>
            <img src="/src/assets/game/skull_island.svg" style={{ height: "60%", width: "60%" }} />
            <h2>Game Over</h2>
            <p>Unfortunately, you couldn't convince the boss. Better luck next time!</p>
            <button onClick={() => navigate("/")}>Main Menu</button>
        </GeneralPopup>
    );
};

export default LossPopup;