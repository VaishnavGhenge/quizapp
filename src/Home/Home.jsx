import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import Login from "../Login/Login"
import "./Home.css"
import { Redirect } from "react-router-dom";

export default function Home() {
    const [login, setLogin] = useState(false);
    const [page, setPage] = useState("/");

    return (
        <div>
            {page != "/" && <Redirect to={page} />}
            <div className="overlay" style={{ 'display': login ? 'block' : 'none' }} onClick={() => setLogin(false)}></div>
            <Login setLogin={setLogin} display={ login ? 'block' : 'none' } />
            <Navbar setLogin={setLogin} purpose="home" />
            <div className="hero">
                <div className="hero-text">
                    Creating and conducting quiz made easy
                </div>
                <div className="hero-btns">
                    <button className="btn-quiz" onClick={() => setPage("/create-quiz")}>Create quiz</button>
                    <button className="btn-quiz">Join quiz</button>
                </div>
            </div>
        </div>
    )
}