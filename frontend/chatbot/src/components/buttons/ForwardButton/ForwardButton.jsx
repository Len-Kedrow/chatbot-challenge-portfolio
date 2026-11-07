import React from 'react'
import "../CustomButtons.css"
import "./ForwardButton.css"

function ForwardButton({ onClick = () => console.log("Button clicked!") }) {
  return (
    <div style={{ width: "10%" }} onClick={onClick}>
      <div className="custom-button" id="forward-button" />
    </div>
  )
}

export default ForwardButton