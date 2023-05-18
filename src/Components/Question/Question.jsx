import Navbar from "../Navbar/Navbar"
import './Question.css'
import arrow from "../assets/arrow-right-circle-line.svg"
import check from "../assets/check-line.svg"
import close from "../assets/close-line.svg"
import question_ic from "../assets/questionnaire-line.svg"
import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getQuizQuestionsApi } from "../../api/quiz"
import toast, { Toaster } from 'react-hot-toast';
import { createResultApi } from "../../api/result"

const Question = () => {
    const QUE_TIME = 30;

    const [loading, setLoading] = useState(true);
    const { quizId } = useParams();
    const [timer, setTimer] = useState(QUE_TIME);
    const state = useSelector(state => state.auth);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const history = useHistory();

    if (!state.user) {
        history.push(`/signup?redirect=/quiz/${quizId}`);
    }

    useEffect(() => {
        let timeout;
        try {
            getQuizQuestionsApi(quizId, state.token)
                .then(res => {
                    setQuestions(res.data.questions);
                    toast.remove();
                })
                .catch(err => {
                    // console.log(err);
                    toast.error(err.response.data.message || "Problem occured while fetching questions");
                    timeout = setTimeout(() => {
                        toast.remove();
                        if(err.response.status === 401) {
                            history.push("/dashboard");
                        }
                    }, 5000)
                })

        } catch (err) {
            // console.log(err);
            toast.error("Problem occured while fetching questions");
        }

        const interval = setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (timer === -1) {
            if (currentQuestion === questions.length - 1) {
                const answers = questions.map(question => ({ questionId: question.questionId.toString(), answer: question.answer.toString() }));
                console.log(answers);
                createResultApi(quizId, answers, state.token)
                    .then(res => {
                        history.push(`/quiz/${quizId}/result`);
                    })
                    .catch(err => {
                        toast.error("Problem occured while submitting answers");
                    })
            } else {
                setCurrentQuestion((currentQuestion) => currentQuestion + 1);
            }
            setTimer(QUE_TIME);
        }
    }, [timer]);


    useEffect(() => {
        if (questions.length == 0) {
            toast.loading("Loading questions...");
        } else {
            setLoading(false);
            toast.remove();
        }
    }, [questions.length]);

    function handleNext() {
        if (currentQuestion === questions.length - 1) {
            const answers = questions.map(question => ({ questionId: question.questionId.toString(), answer: question.answer.toString() }));
            console.log(answers);
            createResultApi(quizId, answers, state.token)
                .then(res => {
                    history.push(`/quiz/${quizId}/result`);
                })
                .catch(err => {
                    toast.error("Problem occured while submitting answers");
                })
        } else {
            setCurrentQuestion((currentQuestion) => currentQuestion + 1);
        }
        setTimer(QUE_TIME);
    }

    function optionClick(event) {
        const selectedOption = event.target.getAttribute("value");
        setQuestions((questions) =>
            questions.map((question, index) => {
                if (index === currentQuestion) {
                    return {
                        ...question,
                        answer: selectedOption,
                    };
                }
                return question;
            })
        );
    }

    return (
        <div className="Question">
            {loading ? <Toaster /> :
                <>
                    <Toaster />
                    <Navbar />
                    <div className="question-div">
                        <div className="q-top">
                            <div className="q-no">
                                <img src={question_ic} alt="question icon" className="que-icon" />
                                <span>Question {currentQuestion + 1} of {questions.length}</span>
                            </div>
                            <div className="q-time">
                                {timer} seconds left
                            </div>
                        </div>
                        <hr />
                        <div className="qbody">
                            <div className="q-text">{`Q. ${questions[currentQuestion].question}`}</div>
                            <div className="qnote">Choose one of the following answers</div>
                            <div className="options">
                                <div className={`option ${questions[currentQuestion].answer === questions[currentQuestion].options[0] ? 'selected' : ''}`} value={questions[currentQuestion].options[0]} onClick={optionClick}>
                                    <div className="option-no" value={questions[currentQuestion].options[0]}>A.</div>
                                    <span className="value" value={questions[currentQuestion].options[0]}>{questions[currentQuestion].options[0]}</span>
                                </div>
                                <div className={`option ${questions[currentQuestion].answer === questions[currentQuestion].options[1] ? 'selected' : ''}`} value={questions[currentQuestion].options[1]} onClick={optionClick}>
                                    <div className="option-no" value={questions[currentQuestion].options[1]}>B.</div>
                                    <span className="value" value={questions[currentQuestion].options[1]}>{questions[currentQuestion].options[1]}</span>
                                </div>
                                <div className={`option ${questions[currentQuestion].answer === questions[currentQuestion].options[2] ? 'selected' : ''}`} value={questions[currentQuestion].options[2]} onClick={optionClick}>
                                    <div className="option-no" value={questions[currentQuestion].options[2]}>C.</div>
                                    <span className="value" value={questions[currentQuestion].options[2]}>{questions[currentQuestion].options[2]}</span>
                                </div>
                                <div className={`option ${questions[currentQuestion].answer === questions[currentQuestion].options[3] ? 'selected' : ''}`} value={questions[currentQuestion].options[3]} onClick={optionClick}>
                                    <div className="option-no" value={questions[currentQuestion].options[3]}>D.</div>
                                    <span className="value" value={questions[currentQuestion].options[3]}>{questions[currentQuestion].options[3]}</span>
                                </div>
                            </div>
                            <div className="qfooter">
                                <div className="nextbtn" onClick={handleNext}>
                                    <div style={{ 'marginRight': '5px' }}>Next</div>
                                    <img src={arrow} alt="arrow icon pointing to right direction" className="arrow-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    )


}

export default Question