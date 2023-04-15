import "./Navbar.css"
import avatar from "../assets/profile.webp"

export default function Navbar(props) {
    return (
        <div className="Navbar">
            <div className="nav">
                <div className="logo-title">quizzical</div>
                {props.purpose === "home" && <button className="btn-login" onClick={() => props.setLogin(pre => !pre)}>Login</button>}

                {props.purpose === "dashboard" && <div className="dropdown">
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