import React from 'react'
import "../CustomButtons.css"
import "./BackButton.css"

function BackButton({ onClick = () => console.log("Button clicked!") }) {
  return (
    <div style={{ width: "10%" }} onClick={onClick}>
      <div className="custom-button" id="back-button" />
    </div>
  )
}

export default BackButton