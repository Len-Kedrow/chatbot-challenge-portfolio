import React from 'react'
import { Link } from 'react-router-dom';
import "../CustomButtons.css"
import "./PlayButton.css"

function PlayButton({ as: Component = 'div', to, onClick = () => console.log("Button clicked!") }) {
    return (
        <Component to={to} style={{ width: "40%" }} onClick={onClick} className="custom-button-wrapper">
            <div className="custom-button" id="play-button" />
        </Component>
    )
}

export default PlayButton