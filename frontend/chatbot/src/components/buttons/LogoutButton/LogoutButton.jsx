import React from 'react'
import { Link } from 'react-router-dom';
import "../CustomButtons.css"
import "./LogoutButton.css"

function LogoutButton({ as: Component = 'div', to, onClick = () => console.log("Button clicked!") }) {
    return (
        <Component to={to} style={{ width: "100%" }} onClick={onClick} className="custom-button-wrapper">
            <div className="custom-button" id="logout-button" />
        </Component>
    )
}

export default LogoutButton