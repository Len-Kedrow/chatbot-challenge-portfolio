import React from 'react'
import { useEffect, useState } from 'react'
import { getUserInfo, setUserInfo, setUserPassword } from '../utilities/user_auth'
import { useOutletContext } from 'react-router-dom'

function UserSettings() {
    const [userData, setUserData] = useState()
    const [expandField, setExpandField] = useState(Array(3).fill(false))
    const [newDisplayName, setNewDisplayName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [password, setPassword] = useState({
        old: '',
        new: ''
    })

    const { user } = useOutletContext()

    useEffect(() => {
        const infoFetch = async () => {
            setUserData(await getUserInfo())
        }
        infoFetch()
    }, [])

    const toggleExpandComment = (index) => {
        const updatedExpandField = [...expandField];
        updatedExpandField[index] = !updatedExpandField[index];
        setExpandField(updatedExpandField);
    };

    const formatDate = (date) => {
        const newDate = new Date(date)
        return newDate.toLocaleString()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUserData(await setUserInfo(e.target[0].name, e.target[0].value))
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        let res = await setUserPassword(e.target[0].value, e.target[1].value)
        console.log(res)
    }

    return (
        <>
            {user ?
                <>
                    <div>Settings</div>
                    {userData ?
                        <>
                            <div>Display name: {userData.display_name} <button onClick={() => toggleExpandComment(0)}>Change</button></div>
                            {expandField[0] ?
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        id="display-name"
                                        name="display_name"
                                        value={newDisplayName}
                                        onChange={(e) => setNewDisplayName(e.target.value)}
                                    ></input>
                                    <button type='submit'>Submit</button>
                                </form>
                                :
                                undefined}
                            <div>Email: {userData.email} <button onClick={() => toggleExpandComment(1)}>Change</button></div>
                            {expandField[1] ?
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    ></input>
                                    <button type='submit'>Submit</button>
                                </form>
                                :
                                undefined}
                            <button onClick={() => toggleExpandComment(2)}>Change password</button>
                            {expandField[2] ?
                                <form onSubmit={handlePasswordSubmit}>
                                    <input
                                        type="password"
                                        id="old-password"
                                        name="old_password"
                                        placeholder='old password'
                                        value={password.old}
                                        onChange={(e) => setPassword({...password, old: e.target.value})}
                                    ></input> <br />
                                    <input
                                        type="password"
                                        id="old-password"
                                        name="new_password"
                                        placeholder='new password'
                                        value={password.new}
                                        onChange={(e) => setPassword({...password, new: e.target.value})}
                                    ></input>
                                    <button type='submit'>Submit</button>
                                </form>
                                :
                                undefined}
                            <div>Last login: {formatDate(userData.last_login)}</div>
                        </>
                        :
                        <div>Loading</div>}
                </>
                :
                <div>Log in to see this page</div>}
        </>
    )
}

export default UserSettings
