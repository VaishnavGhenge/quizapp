import "./Login.css"
import google from "../assets/google-fill.svg"
import { useState } from "react"
import axios from "../../axiosConfig";
import Alert from "../Alert/Alert";
import { Redirect } from "react-router-dom";

export default function Login(props) {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [formState, setFormState] = useState({ state: "normal", message: "" });
    const [redirect, setRedirect] = useState(false);

    function handleChange(event) {
        const { value, name } = event.target;

        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function validateForm() {
        // username should not be empty 
        if (loginData.username.length === "") {
            setFormState({ state: "warning", message: "Username is required" });
            return false;
        }

        // Password must contain at least one uppercase letter, one lowercase letter, and one digit
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        // password should atleast of length 8
        if (loginData.password.length < 8 || !regex.test(loginData.password)) {
            setFormState({ state: "warning", message: "Password should be valid" });
            return false;
        }

        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setFormState(prev => ({ ...prev, state: "loading" }));

        if (!validateForm()) return;

        try {
            await axios.post("users/login", {
                username: loginData.username,
                password: loginData.password

            })
                .then(res => res.data)
                .then(data => {
                    setFormState({ state: "success", message: (data.message) });
                })
                .catch(error => {
                    setFormState({ state: "error", message: (error.response.data.message || error.message) });
                })
        }
        catch (error) {
            setFormState({ state: "error", message: error.message });
        }
    }

    const redirectSignup = () => setRedirect(true);

    return (
        <div className="Login" style={{ 'display': props.display, 'opacity': props.display === 'block' ? '1' : '0' }}>
            {redirect && <Redirect to="signup" />}
            <div className="login-box">
                <div className="top">
                    <div className="login-text">Login here</div>
                    {/* <img src={close} alt="close icon" className="close-icon" onClick={() => props.setLogin(false)} /> */}
                </div>
                <div className="login-body">
                    {(formState.state === "success" || formState.state === "error" || formState.state === "warning") && <Alert type={formState.state} messages={{ form: formState.message }} />}
                    <form className="login-form" autoComplete="off" onSubmit={handleSubmit} >
                        <div className="input-group">
                            <div className="login-inp-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" className="input-box" onChange={handleChange} value={loginData.username} />
                            </div>
                            <div className="login-inp-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="input-box" onChange={handleChange} value={loginData.password} />
                            </div>
                        </div>
                        <div className="btn-div">
                            <button type="submit" className="btn-login-form">
                                {formState.state === "loading" ? <span className="loader"></span> : <span>Login</span>}
                            </button>
                            <button type="button" className="btn-login-with">
                                <span>Login with</span>
                                <img src={google} className="google-logo" alt="google icon" />
                            </button>
                        </div>
                    </form>
                    <div className="login-footer">
                        <p className="signup-link">New here? <span onClick={redirectSignup}>create new account</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}