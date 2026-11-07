import React, { useEffect } from 'react'
import {
    getAllCharacters,
    addCharacter,
    updateCharacter,
    getCharacter,
    deleteCharacter,
} from "../../utilities/character.jsx";
import { getUserInfo } from '../../utilities/user_auth.jsx';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import TopOverlay from '../../components/TopOverlay.jsx';
import ProfileAvatar from '../../components/home/ProfileAvatar.jsx';

import "./Profile.css"
import CharacterFrame from '../../components/CharacterFrame.jsx';
import BackButton from '../../components/buttons/BackButton/BackButton.jsx';
import LoadingTransition from '../../components/LoadingTransition.jsx';
import { Spinner } from 'react-bootstrap';

function Profile() {
    const [characters, setCharacters] = useState([])
    const [userData, setUserData] = useState([])
    const [showLoading, setShowLoading] = useState(true)

    const { avatar } = useOutletContext()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setUserData(await getUserInfo())
            setCharacters(await getAllCharacters())
        }
        fetchData()
    }, [])

    return (
        <>
            {userData && characters ?
                <>
                    <TopOverlay />
                    <div id="profile-content" style={{ width: "70%", height: "75%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div id="profile-top">
                            <div style={{ width: "40%" }}>
                                <ProfileAvatar avatarChoice={avatar} />
                            </div>
                            <div id="profile-text">
                                <h2>{userData.display_name}</h2>
                                <h3>WINS: {userData.wins} | LOSSES: {userData.losses}</h3>
                            </div>
                        </div>
                        <hr></hr>
                        <div id="profile-character-box">
                            {characters.map((character) => (
                                <>
                                    <CharacterFrame charImg={`http://127.0.0.1:8000${character.image}`} onClick={() => navigate(`./${character.id}`)}>
                                        {character.name}
                                    </CharacterFrame>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="button-group">
                        <BackButton onClick={() => navigate("/")} />
                    </div>
                </>
                :
                <Spinner />}
        </>
    );
}

export default Profile

// <LoadingTransition loadingComplete={userData && characters ? true : false} setLoading={setShowLoading}/>