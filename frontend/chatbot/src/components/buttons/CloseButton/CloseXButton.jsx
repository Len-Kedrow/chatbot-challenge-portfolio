import React from 'react'
import "../CustomButtons.css"
import "./CloseXButton.css"

function CloseXButton({ onClick = () => console.log("Button clicked!"), id = "none" }) {
    return (
      <div style={{ width: "10%" }} onClick={onClick} id={id}>
        <div className="custom-button" id="close-button" />
      </div>
    )
  }

export default CloseXButton