import React from 'react'
import { Link } from 'react-router-dom';
import "../CustomButtons.css"
import "./ItemsButton.css"

function ItemsButton({ as: Component = 'div', to, onClick = () => console.log("Button clicked!") }) {
    return (
        <Component to={to} style={{ width: "40%" }} onClick={onClick} className="custom-button-wrapper">
            <div className="custom-button" id="items-button" />
        </Component>
    )
}

export default ItemsButton