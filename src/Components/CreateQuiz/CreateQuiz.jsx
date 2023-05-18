import "./CreateQuiz.css"
import Navbar from "../Navbar/Navbar"
import CreateQuestion from "./CreateQuestion"
import add from "../assets/add-line.svg"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getQuizApi } from "../../api/quiz"
import Alert from "../Alert/Alert"
import backBtn from "../assets/icons8-arrow-pointing-left-30.png"
import shareBtn from "../assets/icons8-link-30.png"
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from "../../config"

export default function CreateQuiz() {
    const [questions, setQuestions] = useState([]);
    const { quizId } = useParams();
    const [pageMessage, setPageMessage] = useState({ status: 'default', message: '' });
    const [quiz, setQuiz] = useState({ name: '', quizId: '' })
    const state = useSelector(state => state.auth);
    const history = useHistory();

    if (!state.user) {
        history.push("/");
    }

    useEffect(() => {
        try {
            getQuizApi(quizId, state.token)
                .then(res => {
                    setQuestions(res.data.quiz.questions);
                    setQuiz({ name: res.data.quiz.name, quizId: res.data.quiz.quizId });
                })
                .catch(err => {
                    setPageMessage({ status: 'error', message: err.response.data.message || err.message || "Something went wrong" });
                })
        } catch (err) {
            setPageMessage({ status: 'error', message: err.response.data.message || err.message || "Something went wrong" });
        }
    }, [state.user])

    function addQuestion() {
        setQuestions(questions => [...questions, { question: '', options: ['', '', '', ''], queId: questions.length + 1, answer: '' }]);
    }

    function backToDashboard() {
        history.push("/dashboard");
    }

    function copyToClip() {
        navigator.clipboard.writeText(`${BASE_URL}/quiz/${quizId}`);
        toast.success("Link copied to clipboard");
    }

    return (
        <div className="CreateQuiz">
            <Toaster />
            <Navbar />
            {pageMessage.status === 'error' ?
                <div className="quiz-header">
                    <Alert type="error" messages={{ page: pageMessage.message }} />
                </div>
                :
                <>
                    <div className="quiz-header">
                        <div className="quiz-details">
                            <div>
                                <img className="quiz-backbtn" src={backBtn} alt="back button" onClick={backToDashboard} />
                            </div>
                            <h3 className="quiz-title">{quiz.name}</h3>
                            <div>
                                <img className="quiz-sharebtn" src={shareBtn} alt="shareQuiz" onClick={copyToClip} />
                            </div>
                        </div>
                    </div>
                    <div className="create_question_wrapper">
                        <div className="create-que-div">
                            {questions.map(que => <CreateQuestion key={que.questionId || que.queId} que={que} quizId={quiz.quizId} />)}
                        </div>
                    </div>
                    <div className="quiz-footer">
                        <div className="add-question" onClick={addQuestion}>
                            <img src={add} alt="Add icon" />
                            <span>Add question</span>
                        </div>
                    </div>
                </>}
        </div>
    )
}