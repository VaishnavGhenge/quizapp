import Navbar from "../Navbar/Navbar"
import './Question.css'
import arrow from "../assets/arrow-right-circle-line.svg"
import check from "../assets/check-line.svg"
import close from "../assets/close-line.svg"
import question_ic from "../assets/questionnaire-line.svg"

const Question = () => {

    return (
        <div className="Question">
            <Navbar />
            <div className="question-div">
                <div className="q-top">
                    <div className="q-no">
                        <img src={question_ic} alt="question icon" className="que-icon" />
                        Question 1 of 10
                    </div>
                    <div className="q-time">
                        10 seconds left
                    </div>
                </div>
                <hr />
                <div className="qbody">
                    <div className="q-text">Q. What is the smallest country in the world by land area?</div>
                    <div className="qnote">Choose one of the following answers</div>
                    <div className="options">
                        <div className="option"><div className="option-no">A.</div>Vatican City</div>
                        <div className="option"><div className="option-no">B.</div>Monaco</div>
                        <div className="option"><div className="option-no">C.</div>Liechtenstein</div>
                        <div className="option"><div className="option-no">D.</div>San Marino</div>
                    </div>
                    <div className="qfooter">
                        <div className="nextbtn">
                            <div style={{'marginRight': '5px'}}>Next Question</div>
                            <img src={arrow} alt="arrow icon pointing to right direction" className="arrow-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Question