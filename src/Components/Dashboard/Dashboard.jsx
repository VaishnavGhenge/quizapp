import "./Dashboard.css"
import Navbar from "../Navbar/Navbar"
import add from "../assets/add.svg"
import download from "../assets/download-line.svg"

export default function Dashboard(props) {
    const prevQuiz = [
        {
            'id': 1,
            'name': 'Math quiz',
            'result_file': 'result.csv'
        },
        {
            'id': 2,
            'name': 'Science quiz',
            'result_file': 'result.csv'
        },
        {
            'id': 3,
            'name': 'Movie quiz',
            'result_file': 'result.csv'
        },
        {
            'id': 4,
            'name': 'Science-II quiz',
            'result_file': 'result.csv'
        }

    ]

    return (
        <div className="Dashboard">
            <Navbar purpose="dashboard" />
            <div className="dashboard-content">
                <div className="dashboard-upper">
                    <div className="create-quiz">
                        <div className="create-new">
                            <img src={add} alt="grey add icon" className="add-icon" />
                        </div>
                        <p>Create new quiz</p>
                    </div>
                </div>

                <div className="dashboard-lower">
                    <div className="quiz-results">
                        {prevQuiz.map(quiz => <div key={quiz.id} className="pre-result">
                            <span>{quiz.name}</span>
                            <img className="icon" src={download} alt="download icon" />
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}