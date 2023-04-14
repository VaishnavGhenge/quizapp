import "./Signup.css"
import Navbar from "../Navbar/Navbar"
import { useState } from "react"
import google from "../assets/google-fill.svg"
import Alert from "../Alert/Alert"
import axios from "../axiosConfig"

export default function Signup() {
    const [formData, setFormData] = useState({ name: "", username: "", password1: "", password2: "" })
    const [formState, setFormState] = useState({ state: "normal", messages: {} })
    const [usernameState, setUsernameState] = useState({ state: "normal", message: "Username should contain atleast 4 characters" })

    // under developemnt
    async function isValidUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        username = username.trim()
        if (usernameRegex.test(username)) {
            await axios.get(`users/check/${username}`)
                .then(res => res.data)
                .then(data => {
                    setUsernameState({ state: "success", message: data.message })
                })
                .catch(error => {
                    setUsernameState({ state: "error", message: (error.response.data.message || error.message) })
                })
        } else {
            setUsernameState({ state: "error", message: "Username should be valid" })
        }
    }

    function handleChange(event) {
        const { name, value } = event.target
        if (name === "username") {
            if (value.length >= 4)
                isValidUsername(value)
            else
                setUsernameState({ state: "normal", message: "Username should contain atleast 4 characters" })
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function validateForm() {
        const errors = {}

        // Validate Full Name
        if (!formData.name) {
            errors.name = 'Full Name is required'
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Full Name must be at least 2 characters long'
        }

        const usernameRegex = /^[a-zA-Z0-9_]+$/

        // Validate Username
        if (!formData.username) {
            errors.username = 'Username is required'
        } else if (formData.username.trim().length < 4) {
            errors.username = 'Username must be at least 4 characters long'
        } else if (!usernameRegex.test(formData.username)) {
            errors.username = 'Username should be valid'
        }

        // Password must contain at least one uppercase letter, one lowercase letter, and one digit
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        // Validate Password
        if (!formData.password1) {
            errors.password1 = 'Password is required'
        } else if (formData.password1.trim().length < 8) {
            errors.password1 = 'Password must be at least 8 characters long'
        } else if (!regex.test(formData.password1)) {
            errors.password1 = 'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
        }

        // Validate Confirm Password
        if (!formData.password2) {
            errors.password2 = 'Confirm Password is required'
        } else if (formData.password1 !== formData.password2) {
            errors.password2 = 'Passwords do not match'
        }

        return errors
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setFormState({ state: "loading", messages: {} })
        setUsernameState({ state: "normal", message: "" })

        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length === 0) {
            // Submit the form
            // console.log(formData)
            await axios.post("users/create/", {
                name: formData.name,
                username: formData.username,
                password: formData.password1
            })
                .then(res => res.data)
                .then(data => {
                    setFormState({ state: "success", messages: { form: "Account creation successful!" } })
                })
                .catch(error => {
                    setFormState({ state: "error", messages: { form: (error.response.data.message || error.message) } })
                })

        } else {
            // Display the validation errors
            setFormState({ state: "error", messages: validationErrors })
        }
    }

    return (
        <div className="Signup">
            <Navbar />
            <div className="signup-form">
                <h3 className="form-title">Create new account</h3>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    {(formState.state != "normal" && formState.state != "loading") && <Alert type={formState.state} messages={formState.messages} />}
                    <div className="inp-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} id="name" className="input" />
                    </div>
                    <div className="inp-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} id="username" className="input" />
                        <span className={`input-rule inp-${usernameState.state}`}>{usernameState.message}</span>
                    </div>
                    <div className="inp-group">
                        <label htmlFor="password1">Password</label>
                        <input type="password" name="password1" value={formData.password1} onChange={handleChange} id="password1" className="input" />
                        <span className="input-rule">Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit</span>
                    </div>
                    <div className="inp-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="password" name="password2" value={formData.password2} onChange={handleChange} id="password2" className="input" />
                    </div>
                    <div className="signup-button-group">
                        <button type="submit" className="btn-signup">
                            {formState.state === "loading" ? <span className="loader"></span> : <span>Create account</span>}
                        </button>
                        <button type="button" className="btn-g-signup">
                            <span>Signup with</span>
                            <img src={google} className="google-logo" alt="google icon" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}