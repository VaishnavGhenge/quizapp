import Navbar from "../Navbar/Navbar";

import { useState } from "react";

export default function QuizDetails() {
    const [formData, setFormData] = useState({ quizName: '', quizDate: '', quizTime: ''})

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value.toString()
        }));
    }

    function handleSave(e) {
        e.preventDefault();
        
        const { quizName, quizDate, quizTime } = formData;

        try {
            const quizDetails = {
                quizName,
                quizDate,
                quizTime
            }
            console.log(quizDetails);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="QuizDetails">
            <Navbar />
            <div className="quiz-details-form">
                <h3 style={{'fontWeight': '400'}}>Quiz Details</h3>
                <form onSubmit={handleSave}>
                    <div className="input-group-quiz">
                        <label htmlFor="quiz-name">Quiz Name</label>
                        <input type="text" name="quizName" id="quiz-name" className="input-quizdetails" onChange={handleChange} />
                    </div>
                    <div className="input-group-quiz">
                        <label htmlFor="quiz-date">Date</label>
                        <input type="date" name="quizDate" id="quiz-date" className="input-quizdetails" onChange={handleChange} />
                    </div>
                    <div className="input-group-time">
                        <label htmlFor="quiz-time">Time</label>
                        <input type="time" name="quizTime" id="quiz-time" className="input-quizdetails" onChange={handleChange} />
                    </div>
                    <div className="btn-group-quiz">
                        <button type="submit" className="quiz-save">Save</button>
                        <button type="button" className="quiz-save-next">Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}