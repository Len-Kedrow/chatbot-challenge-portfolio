import React from 'react'
import "./CharacterFrame.css"
import { Card } from 'react-bootstrap'

function CharacterFrame({ children, charImg, as: Component = 'div', to, onClick = () => console.log("Button clicked!"), id }) {
    return (
        <Component to={to} onClick={onClick} className="profile-character" id={id}>
            <div className="char-image">
                <img src={charImg} width={"100%"} height={"100%"} />
            </div>
            <div className='profile-character-name'>
                {children}
            </div>
        </Component>
    )
}

export default CharacterFrame