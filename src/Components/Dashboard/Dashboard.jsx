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
import trashBtn from "../assets/icons8-trash.svg"
import { deleteQuizApi } from "../../api/quiz"
import link from "../assets/icons8-link-30.png"
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from "../../config"

export default function Dashboard(props) {
    const state = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const history = useHistory();
    const [userQuizes, setUserQuizes] = useState([]);

    if (!state.user) {
        history.push("/");
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

    function deleteQuiz(quizId) {
        // delete quiz from db
        deleteQuizApi(quizId, state.token)
            .then(res => {
                // delete quiz from state
                setUserQuizes(userQuizes => userQuizes.filter(quiz => quiz.quizId != quizId));
            })
            .catch(err => {
                console.log(err);
                alert("Problem occured while deleting quiz");
            })
    }

    function copyToClip(quizId) {
        navigator.clipboard.writeText(`${BASE_URL}/quiz/${quizId}`)
        toast.success("Link copied to clipboard");
    }

    return (
        <div className="Dashboard">
            <Toaster />
            <Navbar />
            <div className="dashboard-content">
                <div className="dashboard-upper">
                    <div className="create-quiz">
                        <div className="create-new" onClick={() => history.push("/create/quiz")} >
                            <img src={add} alt="grey add icon" className="add-icon" />
                        </div>
                        <p>Create new quiz</p>
                    </div>
                </div>

                <div className="dashboard-lower">
                    <div className="quiz-results">
                        {userQuizes.map(quiz => <div key={quiz.quizId} className="pre-result">
                            <span className="quiz-open" onClick={() => history.push(`/create/quiz/${quiz.quizId}`)}>{quiz.name}</span>
                            <img className="trash-icon" src={trashBtn} alt="delete icon" onClick={() => deleteQuiz(quiz.quizId)} />
                            <img className="icon" src={download} alt="download icon" />
                            <img className="share-icon" src={link} alt="share icon" onClick={() => copyToClip(quiz.quizId)} />
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