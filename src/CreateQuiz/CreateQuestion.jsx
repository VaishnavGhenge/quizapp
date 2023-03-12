import "./CreateQuiz.css"
import question_ic from "../assets/questionnaire-line.svg"
import { useEffect, useState } from "react"

export default function CreateQuestion(props) {
    const [data, setQuestion] = useState(props.que)

    function handleChange(e) {
        const { name, value } = e.target
        setQuestion(que => {
            return {
                ...que,
                [name]: value
            }
        })
    }

    return (
        <div className="CreateQuestion">
            <div className="input-group">
                <input className="question-input" type="text" name="question" value={data.question} onChange={handleChange} placeholder="Question" />
            </div>
            <div className="create-options">
                <div className="option-group">
                    <input className="create-option" type="text" name="option-1" value={data["option-1"]} onChange={handleChange} placeholder="Option 1" />
                    <input className="create-option" type="text" name="option-2" value={data["option-2"]} onChange={handleChange} placeholder="Option 2" />
                </div>
                <div className="option-group">
                    <input className="create-option" type="text" name="option-3" value={data["option-3"]} onChange={handleChange} placeholder="Option 3" />
                    <input className="create-option" type="text" name="option-4" value={data["option-4"]} onChange={handleChange} placeholder="Option 4" />
                </div>
            </div>
        </div>
    )
}