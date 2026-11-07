import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

import { logOut } from '../utilities/user_auth.jsx'
import CharacterPage from './CharacterPage.jsx'

import { Button } from 'react-bootstrap'

import './Homepage.css'



import ProfileButton from '../components/buttons/ProfileButton/ProfileButton.jsx'
import ItemsButton from '../components/buttons/ItemsButton/ItemsButton.jsx'
import LoginButton from '../components/buttons/LoginButton/LoginButton.jsx'
import SignupButton from '../components/buttons/SignupButton/SignupButton.jsx'
import PopupController from './user_auth/PopupController.jsx'
import FireAnimation from '../assets/login/FireAnimation.jsx'
import PlayButton from '../components/buttons/PlayButton/PlayButton.jsx'
import LogoTop from '../components/home/LogoTop.jsx'
import LogoBottom from '../components/home/LogoBottom.jsx'
import TopOverlay from '../components/TopOverlay.jsx'

function Homepage() {
    const { user, loggedIn, setLoggedIn } = useOutletContext()

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [signupWindow, setSignupWindow] = useState(false)
    const [showAnimation, setShowAnimation] = useState(false)

    useEffect(() => {
        if (user) {
            setShowAnimation(true)
            const timer = setTimeout(() => {
                setLoggedIn(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
        else {
            setLoggedIn(false)
            setIsPopupOpen(false)
            setShowAnimation(false)
        }
    }, [user])

    const openPopup = (userSignup) => {
        if (userSignup) {
            setSignupWindow(true)
        }
        else {
            setSignupWindow(false)
        }
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            {loggedIn && user ?
                <div id="home-screen">
                    <TopOverlay />
                    <Link to="/profile"><ProfileButton /></Link>
                    <div style={{ width: "90%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "7vh", marginTop: "5vh" }}>
                        <ProfileButton as={Link} to="/profile" />
                        <ItemsButton />
                        <PlayButton as={Link} to="/game" />
                    </div>
                </div>
                :
                <>
                    {!showAnimation ?
                        <div id="login-screen">
                            <div className='content'>
                                <FireAnimation />
                                <div id="title">
                                    <LogoTop />
                                    <LogoBottom />
                                </div>
                                <div id='login-signup'>
                                    <LoginButton onClick={() => openPopup(false)} />
                                    <SignupButton onClick={() => openPopup(true)} />
                                    {isPopupOpen && <PopupController onClose={closePopup} signupWindow={signupWindow} />}
                                </div>
                            </div>
                        </div>
                        :
                        <div id="temp-container" >
                            <div id="left" style={showAnimation ? { transform: "rotateY(-140deg)" } : ''} />
                            <div id="right" style={showAnimation ? { transform: "rotateY(-140deg)" } : ''} />
                        </div>}
                </>
            }
        </>
    );
}

export default Homepage