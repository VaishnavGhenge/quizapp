import "./Dashboard.css"
import Navbar from "../Navbar/Navbar"
import add from "../assets/add.svg"
import download from "../assets/download-line.svg"
import { logoutAsync } from "../../Redux/auth"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getUserAllQuizzesApi } from "../../api/quiz"

export default function Dashboard(props) {
    const state = useSelector(state => state.auth)
    const [redirect, setRedirect] = useState("")
    const dispatch = useDispatch();
    const history = useHistory();
    const [userQuizes, setUserQuizes] = useState([]);

    if (!state.user) {
        history.push("/");
    }

    if (redirect != "") {
        if (redirect == "create-new")
            history.push("/create/quiz");
    }

    useEffect(() => {
        getUserAllQuizzesApi(state.token)
            .then(res => {
                setUserQuizes(res.data.quizes);
            })
            .catch(err => {
                console.log(err);
                alert("Problem occured while fetching quizes");
            })
    }, [])

    function handleLogout() {
        dispatch(logoutAsync(state.user));
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
                        {userQuizes.map(quiz => <div key={quiz.quizId} className="pre-result">
                            <span className="quiz-open" onClick={() => history.push(`/create/quiz/${quiz.quizId}`)}>{quiz.name}</span>
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