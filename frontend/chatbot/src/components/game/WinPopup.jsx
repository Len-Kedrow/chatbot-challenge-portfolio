import React from 'react';
import './WinPopup.css';
import GeneralPopup from '../GeneralPopup';
import { useNavigate } from 'react-router-dom';

const WinPopup = ({ onClose }) => {
    const navigate = useNavigate()

    return (
        <GeneralPopup id="win-popup" onClose={onClose}>
            <img src="/src/assets/game/bag_of_coins.svg" style={{ height : "60%", width : "60%"}}/>
            <h2>Congratulations!</h2>
            <p>You have successfully convinced the boss to buy your item!</p>
            <button onClick={() => navigate("/")}>Main Menu</button>
        </GeneralPopup>
    );
};

export default WinPopup;
