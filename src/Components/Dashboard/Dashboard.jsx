import "./Dashboard.css"
import Navbar from "../Navbar/Navbar"
import add from "../assets/add.svg"
import download from "../assets/download-line.svg"
import { logoutAsync } from "../../Redux/auth"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"

export default function Dashboard(props) {
    const state = useSelector(state => state.auth)
    const [redirect, setRedirect] = useState("")
    const dispatch = useDispatch()

    const prevQuiz = [
        {
            'id': 1,
            'name': 'Math quiz',
            'result_file': 'result.csv'
        },
        {
            'id': 2,
            'name': 'Science quiz',
            'result_file': 'result.csv'
        },
        {
            'id': 3,
            'name': 'Movie quiz',
            'result_file': 'result.csv'
        },
        {
            'id': 4,
            'name': 'Science-II quiz',
            'result_file': 'result.csv'
        }

    ]

    if(!state.user) {
        return <Redirect to="/" />
    }

    if(redirect != "") {
        if(redirect == "create-new")
            return <Redirect to="/quiz" />
    }

    function handleLogout() {
        console.log(state.user)
        dispatch(logoutAsync(state.user))
    }

    return (
        <div className="Dashboard">
            <Navbar />
            <div className="dashboard-content">
                <div className="dashboard-upper">
                    <div className="create-quiz">
                        <div className="create-new" onClick={() => setRedirect("create-new")} >
                            <img src={add} alt="grey add icon" className="add-icon" />
                        </div>
                        <p>Create new quiz</p>
                    </div>
                </div>

                <div className="dashboard-lower">
                    <div className="quiz-results">
                        {prevQuiz.map(quiz => <div key={quiz.id} className="pre-result">
                            <span>{quiz.name}</span>
                            <img className="icon" src={download} alt="download icon" />
                        </div>)}
                        <div className="pre-result" onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}