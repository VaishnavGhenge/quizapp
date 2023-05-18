import Participant from "./Participant"
import './Leaderboard.css'
import rank1 from "../assets/rank1.png"
import rank2 from "../assets/rank2.png"
import rank3 from "../assets/rank3.png"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuizResultApi } from "../../api/result"
import { useSelector } from "react-redux"
import toast, { Toaster } from 'react-hot-toast';


const Leaderboard = () => {
    const [participants, setParticipants] = useState([]);
    const { quizId } = useParams();
    const state = useSelector(state => state.auth);

    useEffect(() => {
        getQuizResultApi(quizId, state.token)
            .then(res => {
                setParticipants(res.data.participants);
                console.log(res.data.participants);
            }
            )
            .catch(err => {
                console.log(err);
                toast.error("Problem occured while fetching leaderboard");
            }
            )
    }, [])
    return (

        <div className="wrapper">
            <Toaster />
            <h1 className="leaderboard">Leaderboard</h1>
            <div className="top3">
                {participants[1] && <div className="runner1 w-card">
                    <img src={rank2} alt="" className="ranks" />
                    <div className="pts">
                        {(participants[1] && participants[1].totalMarks) || 0}
                    </div>
                    <div className="pname">
                        {(participants[1] && participants[1].user) || "No one"}
                    </div>
                </div>}
                <div className="winner w-card">
                    <img src={rank1} alt="" className="ranks" />
                    <div className="pts">
                        {(participants[0] && participants[0].totalMarks) || 0}
                    </div>
                    <div className="pname">
                        {(participants[0] && participants[0].user) || "No one"}
                    </div>
                </div>
                <div className="runner2 w-card">
                    <img src={rank3} alt="" className="ranks" />
                    <div className="pts">
                        {(participants[2] && participants[2].totalMarks) || 0}
                    </div>
                    <div className="pname">
                        {(participants[2] && participants[2].user) || "No one"}
                    </div>
                </div>
            </div>
            <div className="runners">

                <table>
                    <thead>
                        <tr>
                            <th> Rank </th>
                            <th> Name </th>
                            <th> Points </th>
                        </tr>
                    </thead>
                    <tbody>

                        {participants.map((participant, index) => {
                            return (
                                <Participant name={participant.user} rank={index + 1} points={participant.totalMarks} />
                            )
                        })}
                    </tbody>

                </table>


            </div>
        </div>
    )
}

export default Leaderboard