import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import Login from "../Login/Login"
import "./Home.css"

export default function Home() {
    const [login, setLogin] = useState(false)

    return (
        <div>
            {login && <div className="overlay"></div>}
            {login && <Login setLogin={setLogin} />}
            <Navbar setLogin={setLogin} />
            <div className="hero">
                <div className="hero-text">
                    Create and share quiz made easy
                </div>
                <div className="hero-btns">
                    <button className="btn-quiz">Create quiz</button>
                    <button className="btn-quiz">Join quiz</button>
                </div>
            </div>
        </div>
    )
}