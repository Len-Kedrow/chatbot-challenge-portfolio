import React from 'react';
import { Link } from 'react-router-dom';
import "../CustomButtons.css";
import "./ProfileButton.css";

function ProfileButton({ as: Component = 'div', to, onClick = () => console.log("Button clicked!") }) {
  return (
    <Component to={to} style={{ width: "40%" }} onClick={onClick} className="custom-button-wrapper">
      <div className="custom-button" id="profile-button" />
    </Component>
  );
}

export default ProfileButton;