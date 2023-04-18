import "./Navbar.css"
import avatar from "../assets/profile.webp"
import { useSelector } from "react-redux"

export default function Navbar(props) {
    const state = useSelector(state => state.auth)
    return (
        <div className="Navbar">
            <div className="nav">
                <div className="logo-title">quizzical</div>
                {!state.user && <button className="btn-login" onClick={() => props.setLogin(pre => !pre)}>Login</button>}

                {state.user && <div className="dropdown">
                    <div className="avatar-div">
                        <img src={avatar} alt="profile image" className="avatar" />
                    </div>
                    <div className="dropdown-content">
                        <div className="dropdown-option">Profile</div>
                        <div className="dropdown-option">Log out</div>
                    </div>
                </div>}
            </div>
            <hr />
        </div>
    )
}