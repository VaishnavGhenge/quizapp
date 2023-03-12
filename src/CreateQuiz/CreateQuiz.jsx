import "./CreateQuiz.css"
import Navbar from "../Navbar/Navbar"
import CreateQuestion from "./CreateQuestion"
import add from "../assets/add-line.svg"
import questionData from "../data/empty_questions.js"
import { useState } from "react"

export default function CreateQuiz() {
    const [questions, setQuestions] = useState(questionData)
    var cnt = 3

    function addQuestion() {
        setQuestions(prev => ([
            ...prev,
            {
                "id": cnt++,
                "question": "",
                "option-1": "",
                "option-2": "",
                "option-3": "",
                "option-4": ""
            }
        ]))
    }

    return (
        <div className="CreateQuiz">
            <Navbar purpose="dashboard" />
            <div className="quiz-header">
                <div className="quiz-details">
                    <h3 className="quiz-title">Sceince quiz</h3>
                </div>
            </div>
            <div className="create-que-div">
                {questions.map(que => <CreateQuestion key={que.id} que={que} />)}
            </div>
            <div className="quiz-footer">
                <div className="add-question" onClick={addQuestion}>
                    <img src={add} alt="Add icon" />
                    <span>Add question</span>
                </div>
            </div>
        </div>
    )
}