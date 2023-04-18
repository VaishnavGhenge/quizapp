import Navbar from "../Navbar/Navbar";
import axios from "../../axiosConfig"
import "./CreateQuiz.css";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function QuizDetails() {
    const [formData, setFormData] = useState({ quizName: '', quizDate: '', quizTime: '', quizDescription: '' })
    const state = useSelector(state => state.auth)

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value.toString()
        }));
    }

    async function handleSave(e) {
        e.preventDefault();

        const { quizName, quizDate, quizTime, quizDescription } = formData;

        try {
            // syntax for Date() is: new Date(year, month, day, hours, minutes, seconds, milliseconds)
            // month is 0-indexed, so 0 is January, 1 is February, etc.
            // day is 1-indexed, so 1 is the first day of the month, 2 is the second day of the month, etc.
            // hours, minutes, seconds, and milliseconds are optional

            const day = parseInt(quizDate.toString().slice(8, 10));
            const month = parseInt(quizDate.toString().slice(5, 7)) - 1;
            const year = parseInt(quizDate.toString().slice(0, 4));
            const hour = parseInt(quizTime.toString().slice(0, 2));
            const minute = parseInt(quizTime.toString().slice(3, 5));
            const quizDateObj = new Date(year, month, day, hour, minute);

            console.log(quizName.toString(), quizDescription.toString(), quizDateObj);

            const res = await axios.post("/quizzes/create", {
                name: quizName.toString(),
                description: quizDescription.toString(),
                datetime: quizDateObj,
            }, {
                headers: { authorization: `Bearer ${state.token}`, 'Content-Type': 'application/json' }
            })
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="QuizDetails">
            <Navbar />
            <div className="quiz-details-form">
                <h3 style={{ 'fontWeight': '400' }}>Quiz Details</h3>
                <form onSubmit={handleSave}>
                    <div className="input-group-quiz">
                        <label htmlFor="quiz-name">Quiz Name</label>
                        <input type="text" name="quizName" id="quiz-name" className="input-quizdetails" onChange={handleChange} />
                    </div>
                    <div className="input-group-quiz">
                        <label htmlFor="quiz-date">Date</label>
                        <input type="date" name="quizDate" id="quiz-date" className="input-quizdetails" onChange={handleChange} />
                    </div>
                    <div className="input-group-quiz">
                        <label htmlFor="quiz-time">Time</label>
                        <input type="time" name="quizTime" id="quiz-time" className="input-quizdetails" onChange={handleChange} />
                    </div>
                    <div className="input-group-quiz">
                        <label htmlFor="quiz-description">Describe Quiz</label>
                        <textarea name="quizDescription" id="quiz-description" className="input-quizdetails" cols="30" rows="5" onChange={handleChange}></textarea>
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