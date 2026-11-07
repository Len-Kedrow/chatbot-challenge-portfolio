import React from 'react'
import { useState, useEffect } from 'react'
import { logIn, confirmUser } from '../../utilities/user_auth.jsx'
import { useNavigate, useOutletContext } from 'react-router-dom'
import SubmitButton from '../../components/buttons/SubmitButton/SubmitButton.jsx'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { user, setUser } = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await logIn(formData.email, formData.password)
        setUser(await confirmUser())
        navigate("/")
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="signup-login-form">
                <div className="form-field">
                    <span>Email</span>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-field-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <span>Password</span>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-field-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ width : "100%", height : "20%" }}>
                    <button type="submit" style={{ background: "none", width : "40%", height: "auto", padding: "0" }}><SubmitButton /></button>
                </div>
            </form>
        </>
    )
}

export default Login