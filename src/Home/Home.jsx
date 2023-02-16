import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import "./Home.css"
export default function Home() {
    const [overlay, setOverlay] = useState(false)

    return (
        <div>
            <div className="overlay" style={{"display": overlay === false ? 'none' : 'inline'}}></div>
            <Navbar updateOverlay={() => setOverlay(true)} />
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