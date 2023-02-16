import Navbar from "../Navbar/Navbar"
import './Question.css'
const Question = () =>{

    return(
      <>
             <Navbar />
        <div className="question">

            <div className="q-top">
                <div className="q-no">
                    Question 1 of 10
                </div>
                <div className="q-time">
                    19:02 left
                </div>
            </div>
           
            <hr />
            <div className="q-title">  Q. What Software Company is Headquartered in Redmond, Washington? Microsoft</div>
              
            <div className="options">
                <div className="option">Option A</div>
                <div className="option">Option A</div>
                <div className="option">Option A</div>
                <div className="option">Option A</div>
            </div>

            <button className="nextb">Next Question</button>
        

       </div>
      </>
    )


}

export default Question