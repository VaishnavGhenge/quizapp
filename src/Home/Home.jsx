import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import Login from "../Login/Login"
import "./Home.css"

export default function Home() {
    const [login, setLogin] = useState(false)

    return (
        <div>
            <div className="overlay" style={{ 'display': login ? 'block' : 'none' }}></div>
            <Login setLogin={setLogin} display={ login ? 'block' : 'none' } />
            <Navbar setLogin={setLogin} purpose="home" />
            <div className="hero">
                <div className="hero-text">
                    Creating and conducting quiz made easy
                </div>
                <div className="hero-btns">
                    <button className="btn-quiz">Create quiz</button>
                    <button className="btn-quiz">Join quiz</button>
                </div>
            </div>
        </div>
    )
}