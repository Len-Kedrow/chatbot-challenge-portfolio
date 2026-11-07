import React from 'react'
import { Link } from 'react-router-dom';
import "../CustomButtons.css"
import "./InfoButton.css"

function InfoButton({ as: Component = 'div', to, onClick = () => console.log("Button clicked!") }) {
    return (
        <Component to={to} style={{ width: "100%" }} onClick={onClick} className="custom-button-wrapper">
            <div className="custom-button" id="info-button" />
        </Component>
    )
}

export default InfoButton