import "./Navbar.css"
import avatar from "../assets/profile.webp"
import { useSelector } from "react-redux"
import { useState } from "react"
import { Redirect } from "react-router-dom"

export default function Navbar(props) {
    const state = useSelector(state => state.auth)
    const [redirect, setRedirect] = useState("");

    if(redirect == 'signup' && props.page != 'signup') return (<Redirect to="/signup" />)

    var render;
    if (state.user) {
        render =
            <div className="dropdown">
                <div className="avatar-div">
                    <img src={avatar} alt="profile image" className="avatar" />
                </div>
                <div className="dropdown-content">
                    <div className="dropdown-option">Profile</div>
                    <div className="dropdown-option">Log out</div>
                </div>
            </div>
    } else {
        render =
            <div className="navbtn-group">
                <button className="nav-btn" onClick={() => props.setLogin(pre => !pre)}>Login</button>
                <button className="nav-btn" onClick={() => setRedirect("signup")}>Signup</button>
            </div>
    }
    return (
        <div className="Navbar">
            <div className="nav">
                <div className="logo-title">quizzical</div>
                {render}
            </div>
            <hr />
        </div>
    )
}