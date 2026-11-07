import React from 'react'
import { Link } from 'react-router-dom';
import "../CustomButtons.css"
import "./SubmitButton.css"

function SubmitButton({ as: Component = 'div', to, onClick = () => console.log("Button clicked!") }) {
    return (
        <Component to={to} style={{ width: "100%" }} onClick={onClick} className="custom-button-wrapper">
            <div className="custom-button" id="submit-button" />
        </Component>
    )
}

export default SubmitButton