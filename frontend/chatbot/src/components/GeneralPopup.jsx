import React from 'react'
import "./GeneralPopup.css"
import CloseXButton from './buttons/CloseButton/CloseXButton'

function GeneralPopup({ as: Component = 'div', onClose, children, id }) {
    return (
        <Component>
            <div className="popup-background">
                <div className="popup-window" id={id}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: "2%" }}>
                        <CloseXButton onClick={onClose} />
                    </div>
                    {children}
                </div>
            </div>
        </Component>
    )
}

export default GeneralPopup