import React, { useState } from 'react'
import GeneralPopup from '../GeneralPopup';
import "./ProfileAvatar.css"

const avatarSvgBasePath = "/src/assets/profile_avatars/profile_avatar_"

function ProfileAvatar({ avatarChoice }) {
    const constructImagePath = (avatarChoice) => {
        return `${avatarSvgBasePath}${avatarChoice}.svg`;
    };

    return (
        <>
            <div id="avatar-display">
                <img src={constructImagePath(avatarChoice)} style={{ height : "100%", width : "100%"}}/>
            </div>
        </>
    )
}

export default ProfileAvatar