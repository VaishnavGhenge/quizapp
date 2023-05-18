import "./Signup.css"
import Navbar from "../Navbar/Navbar"
import { useState } from "react"
import google from "../assets/google-fill.svg"
import Alert from "../Alert/Alert"
import axios from "../../axiosConfig"
import { createUserApi } from "../../api/auth"
import Login from "../Login/Login"
import { useSelector, useDispatch } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { setEmailAsync } from "../../Redux/verifyEmail"
import { useHistory } from "react-router-dom"

export default function Signup() {
    const state = useSelector(state => state.auth)
    const [formData, setFormData] = useState({ name: "", username: "", email: "", password1: "", password2: "" })
    const [formState, setFormState] = useState({ state: "normal", messages: {} })
    const [inputStatus, setInputStatus] = useState({
        username: { message: "Username should contain atleast 4 characters", status: "default" },
        email: { message: "", status: "default" },
        password1: { message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit", status: "default" },
        password2: { message: "", status: "default" },
        name: { message: "", status: "default" }
    });
    const [redirectLogin, setRedirectLogin] = useState(false);
    const dispatch = useDispatch();
    const redirect = useParams().redirect || '';
    const history = useHistory();

    if (state.user) {
        if(redirect != '') {
            history.push(redirect);
        }
        else {
            return <Redirect to="/dashboard" />
        }
    }

    if(formState.state === "success") {
        return <Redirect to="/verify-email" />
    }

    // check whether the username is available or not
    async function isValidUsername(username) {
        username = username.trim()

        await axios.get(`users/check-user/${username}`)
            .then(res => res.data)
            .then(data => {
                setInputStatus(prev => ({
                    ...prev,
                    username: { message: data.message, status: "success" }
                }))
                return true;
            })
            .catch(error => {
                setInputStatus(prev => ({
                    ...prev,
                    username: { message: (error.response.data.message || error.message), status: "error" }
                }))
                return false;
            })
    }

    async function isEmailValid(email) {
        email = email.trim()

        await axios.post('users/check-email', {
            email
        })
            .then(res => res.data)
            .then(data => {
                setInputStatus(prev => ({
                    ...prev,
                    email: { message: data.message, status: "success" }
                }))
                dispatch(setEmailAsync(email));
                return true;
            })
            .catch(error => {
                setInputStatus(prev => ({
                    ...prev,
                    email: { message: (error.response.data.message || error.message), status: "error" }
                }))
                return false;
            })
    }

    function validateInput(name, value) {
        if (name === "name") {
            if (!value) {
                setInputStatus(prev => ({
                    ...prev,
                    name: { message: "Full Name is required", status: "error" }
                }))
                return false;
            } else if (value.trim().length < 2) {
                setInputStatus(prev => ({
                    ...prev,
                    name: { message: "Full Name must be at least 2 characters long", status: "error" }
                }))
                return false;
            } else {
                setInputStatus(prev => ({
                    ...prev,
                    name: { message: "", status: "default" }
                }))
            }
        }
        else if (name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!value) {
                setInputStatus(prev => ({
                    ...prev,
                    email: { message: "Email is required", status: "error" }
                }))
                return false;
            } else if (!emailRegex.test(value)) {
                setInputStatus(prev => ({
                    ...prev,
                    email: { message: "Email should be valid", status: "error" }
                }))
                return false;
            } else if (!isEmailValid(value)) {
                return false;
            } 
            
            // else {
            //     setInputStatus(prev => ({
            //         ...prev,
            //         email: { message: "", status: "default" }
            //     }))
            // }
        }
        else if (name === "username") {
            const usernameRegex = /^[a-zA-Z0-9_]+$/
            if (!value) {
                setInputStatus(prev => ({
                    ...prev,
                    username: { message: "Username is required", status: "error" }
                }))
                return false;
            } else if (value.trim().length < 4) {
                setInputStatus(prev => ({
                    ...prev,
                    username: { message: "Username must be at least 4 characters long", status: "error" }
                }))
                return false;
            } else if (!usernameRegex.test(value)) {
                setInputStatus(prev => ({
                    ...prev,
                    username: { message: "Username should be valid", status: "error" }
                }))
                return false;
            } else if (!isValidUsername(value)) {
                return false;
            } else {
                setInputStatus(prev => ({
                    ...prev,
                    username: { message: "Username is available", status: "success" }
                }))
            }
        }
        else if (name === "password1") {
            const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}\[\]|\\;:'",.<>\/?`~-]{8,}$/;

            if (!value) {
                setInputStatus(prev => ({
                    ...prev,
                    password1: { message: "Password is required", status: "error" }
                }))
                return false;
            } else if (value.trim().length < 8) {
                setInputStatus(prev => ({
                    ...prev,
                    password1: { message: "Password must be at least 8 characters long", status: "error" }
                }))
                return false;
            } else if (!emailRegex.test(value)) {
                setInputStatus(prev => ({
                    ...prev,
                    password1: { message: "Password must contain at least one uppercase letter, one lowercase letter, and one digit", status: "error" }
                }))
                return false;
            } else {
                setInputStatus(prev => ({
                    ...prev,
                    password1: { message: "", status: "default" }
                }))
            }
        }
        else if (name === "password2") {
            if (!value) {
                setInputStatus(prev => ({
                    ...prev,
                    password2: { message: "Password is required", status: "error" }
                }))
                return false;
            } else if (formData.password1 !== value) {
                setInputStatus(prev => ({
                    ...prev,
                    password2: { message: "Passwords do not match", status: "error" }
                }))
                return false;
            } else {
                setInputStatus(prev => ({
                    ...prev,
                    password2: { message: "", status: "default" }
                }))
            }
        }
        return true;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        validateInput(name, value);
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (validateInput("name", formData.name) && validateInput("username", formData.username) && validateInput("password1", formData.password1) && validateInput("password2", formData.password2)) {
            setFormState({ state: "loading", messages: {} })
            createUserApi({ name: formData.name, username: formData.username, password: formData.password1, email: formData.email })
                .then(res => res.data)
                .then(data => {
                    setFormState({ state: "success", messages: { form: "Account creation successful!" } });
                })
                .catch(error => {
                    setFormState({ state: "error", messages: { form: (error.response.data.message || error.message) } })
                })
        }
        else {
            setFormState({ state: "error", messages: { form: "Invalid input" } });
        }
    }

    return (
        <div className="Signup">
            <div className="overlay" style={{ 'display': redirectLogin ? 'block' : 'none' }} onClick={() => setRedirectLogin(false)}></div><Login setLogin={setRedirectLogin} display={redirectLogin ? 'block' : 'none'} /><Navbar setLogin={setRedirectLogin} page="signup" /><div className="signup-form">
                <h3 className="form-title">Create new account</h3>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    {(formState.state != "normal" && formState.state != "loading") && <Alert type={formState.state} messages={formState.messages} />}
                    <div className="inp-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} id="name" className="input" />
                        <span className={`input-rule inp-${inputStatus.name.status}`}>{inputStatus.name.message}</span>
                    </div>
                    <div className="inp-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} id="username" className="input" />
                        <span className={`input-rule inp-${inputStatus.username.status}`}>{inputStatus.username.message}</span>
                    </div>
                    <div className="inp-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} id="email" className="input" />
                        <span className={`input-rule inp-${inputStatus.email.status}`}>{inputStatus.email.message}</span>
                    </div>
                    <div className="inp-group">
                        <label htmlFor="password1">Password</label>
                        <input type="password" name="password1" value={formData.password1} onChange={handleChange} id="password1" className="input" />
                        <span className={`input-rule inp-${inputStatus.password1.status}`}>{inputStatus.password1.message}</span>
                    </div>
                    <div className="inp-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="password" name="password2" value={formData.password2} onChange={handleChange} id="password2" className="input" />
                        <span className={`input-rule inp-${inputStatus.password2.status}`}>{inputStatus.password2.message}</span>
                    </div>
                    <div className="signup-button-group">
                        <button type="submit" className="btn-signup" disabled={formState.state === "loading"}>
                            {formState.state === "loading" ? <span className="loader"></span> : <span>Create account</span>}
                        </button>

                        <button type="submit" className="btn-g-signup">
                            <span>Signup with</span>
                            <img src={google} className="google-logo" alt="google icon" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}