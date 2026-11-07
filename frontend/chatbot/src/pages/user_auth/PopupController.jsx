import React, { useState } from 'react'
import "./PopupController.css"
import CloseXButton from '../../components/buttons/CloseButton/CloseXButton';
import Login from './Login';
import Signup from './Signup';

function PopupController({ onClose, signupWindow }) {
    return (
        <div className="popup-background">
            <div className="popup-window" id={signupWindow ? "auth-signup" : "auth-login"}>
                <div style={{ width : "100%", display : "flex", justifyContent: "flex-end", marginBottom: "2%"}}>
                    <CloseXButton onClick={onClose} />
                </div>
                {signupWindow ? <Signup /> : <Login />}
            </div>
        </div>
    );
}

export default PopupController