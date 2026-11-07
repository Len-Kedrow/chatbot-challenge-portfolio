import React, { useEffect, useState } from 'react'
import MenuButton from './buttons/MenuButton/MenuButton'
import InfoButton from './buttons/InfoButton/InfoButton'
import SettingsButton from './buttons/SettingsButton/SettingsButton'
import LogoutButton from './buttons/LogoutButton/LogoutButton'
import RedoButton from './buttons/RedoButton/RedoButton'
import GeneralPopup from './GeneralPopup'
import ProfileAvatar from './home/ProfileAvatar'
import UserSettings from '../pages/UserSettings'
import { logOut, setUserInfo } from '../utilities/user_auth'

import { useNavigate, useOutletContext } from 'react-router-dom'

import "./TopOverlay.css"

const allAvatars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

function TopOverlay() {
    const { user, setUser } = useOutletContext()
    const { avatar, setAvatar } = useOutletContext()

    const navigate = useNavigate()

    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [settingsMenu, setSettingsMenu] = useState(false)
    const [isAvatarOpen, setIsAvatarOpen] = useState(false)

    useEffect(() => {
        setAvatar(user.profile_picture)
    }, [user])

    const handleLogOut = async (e) => {
        setUser(await logOut())
        navigate("/")
    }

    const handleAvatar = async (i) => {
        setAvatar(i)
        setUser(await setUserInfo("profile_picture", i))
        setIsAvatarOpen(false)
    }

    return (
        <>
            <div id="avatar-home" onClick={() => setIsAvatarOpen(true)}>
                <ProfileAvatar avatarChoice={avatar} />
            </div>
            {isAvatarOpen ?
                <GeneralPopup onClose={() => setIsAvatarOpen(false)} id="avatar-popup">
                    <div id="avatar-box">
                        {allAvatars.map((i) => (
                            <div key={i} onClick={() => handleAvatar(i)} style={{ height: "85%", width: "85%" }}>
                                <ProfileAvatar avatarChoice={i} />
                            </div>
                        ))}
                    </div>
                </GeneralPopup>
                :
                undefined}
            <div className="info-bar">
                <span style={{ fontSize: "5vh", color: "black" }}>{user.display_name}</span>
                <span style={{ fontSize: "5vh", color: "black" }}>Gold: 20</span>
            </div>
            <div className='settings-group'>
                <MenuButton onClick={() => setSettingsMenu(!settingsMenu)} />
                {settingsMenu && (
                    <div className="settings-drop">
                        <InfoButton onClick={() => setIsInfoOpen(true)} />
                        <SettingsButton onClick={() => setIsSettingsOpen(true)} />
                        <RedoButton onClick={() => navigate("/")} />
                        <LogoutButton onClick={handleLogOut} />
                    </div>
                )}
            </div>
            {isInfoOpen ?
                <GeneralPopup onClose={() => setIsInfoOpen(false)} id={"info-popup"}>
                    <h3>Character Setup & Avatar Creation:</h3>
                    <p>
                        <ul>
                            <li>Kick things off by creating your character, complete with a fully customizable avatar to show off your unique style.</li>
                            <li>You’ve got 6 points to spread across three key stats: <strong>Strength, Intelligence, and Charisma.</strong></li>
                            <li>
                                <ul>
                                    <li>Strength flexes your physical power.</li>
                                    <li>Intelligence sharpens your mental edge.</li>
                                    <li>Charisma turns on your charm.</li>
                                </ul>
                            </li>
                            <li>These stats shape how the AI boss sees you, so choose wisely and tailor your strategy to match your character’s strengths.</li>
                            <li>Each stat can range from 0 to 6. The higher the stat, the better your chances of winning in different situations. For example:</li>
                            <ul>
                                <li>A high-charisma character might sweet-talk the AI boss into anything.</li>
                                <li>A brainy character will impress with smart moves and solid logic.</li>
                            </ul>
                        </ul>
                    </p>
                    <h3>Game Objective:</h3>
                    Your mission? Convince the AI boss to do what you want—like buying that item—before the game ends. You’ll know your goal and who you’re up against right before you start, so be ready!
                    <h3>Turn-Based Dialogue:</h3>
                    The game is played in turns, like a strategic dance-off. You and the AI boss take turns to respond.
                    How well your responses land depends on your stats and your game plan! Pay attention to the AI’s reactions, tweak your approach as needed, and most importantly, have fun with it. Try out different strategies—there’s no right or wrong way to play!
                    <h3>Winning:</h3>
                    Seal the deal with the AI boss before you run out of turns. If they’re not convinced and you hit zero turns, it’s game over! Best case? You try again. Worst case? You’re dragon food.
                    <h3>Rewards:</h3>
                    Win, and you’ll stack up some gold—essential for unlocking new challenges and epic adventures ahead.
                </GeneralPopup>
                :
                undefined}
            {isSettingsOpen ?
                <GeneralPopup onClose={() => setIsSettingsOpen(false)} id={"settings-popup"}>
                    <UserSettings />
                </GeneralPopup>
                :
                undefined}
        </>
    )
}

export default TopOverlay