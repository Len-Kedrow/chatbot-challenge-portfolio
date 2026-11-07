import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCharacter } from '../../utilities/character'
import CharacterFrame from '../../components/CharacterFrame'
import "./Character.css"
import TopOverlay from '../../components/TopOverlay'
import BackButton from '../../components/buttons/BackButton/BackButton'

function Character() {
    const [charData, setCharData] = useState([])
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setCharData(await getCharacter(id))
        }
        fetchData()
    }, [])

    console.log(charData)

    return (
        <>
            <TopOverlay />
            {charData ?
                <div className="character-info">
                    <div style={{ height: "40%", width: "50%" }}>
                        <CharacterFrame charImg={`http://127.0.0.1:8000${charData.image}`} onClick={() => navigate(`./${charData.id}`)} id="character-info-frame">
                            {charData.name}
                        </CharacterFrame>
                    </div>
                    <hr></hr>
                    <div className="character-stats">
                        <div>Wins: {charData.wins} | Losses: {charData.losses}</div>
                        <div>Strength: {charData.strength}</div>
                        <div>Intelligence: {charData.intelligence}</div>
                        <div>Charisma: {charData.charisma}</div>
                    </div>
                </div>
                :
                undefined}
            <div className="button-group">
                <BackButton onClick={() => navigate("/profile")} />
            </div>
        </>
    )
}

export default Character