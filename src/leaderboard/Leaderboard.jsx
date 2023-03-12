import Participant from "./Participant"
import './Leaderboard.css'
import rank1 from "../assets/rank1.png"
import rank2 from "../assets/rank2.png"
import rank3 from "../assets/rank3.png"

const Leaderboard = () => {
    const participants = [
        {
            "rank": 4,
            "name": "Umesh Bagade",
            "points": 1094
        },
        {
            "rank": 5,
            "name": "Vaishnav Ghenge",
            "points": 1092
        }
    ]
    return (

        <div className="wrapper">
            <h1>Leaderboard</h1>
            <div className="top3">
                <div className="runner1 w-card">
                    <img src={rank2} alt="" className="ranks" />
                    <div className="pts">
                        1029
                    </div>
                    <div className="pname">
                        Umesh Bagade
                    </div>
                </div>
                <div className="winner w-card">
                    <img src={rank1} alt="" className="ranks" />
                    <div className="pts">
                        1029
                    </div>
                    <div className="pname">
                        Umesh Bagade
                    </div>
                </div>
                <div className="runner2 w-card">
                    <img src={rank3} alt="" className="ranks" />
                    <div className="pts">
                        1029
                    </div>
                    <div className="pname">
                        Umesh Bagade
                    </div>
                </div>
            </div>
            <div className="runners">

                <table>
                    <tr>
                        <th> Rank </th>
                        <th> Name </th>
                        <th> Points </th>
                    </tr>

                    {/* Showing the remaining participants */}

                    <Participant pdetails={participants[0]} />

                    <Participant pdetails={participants[1]} />


                </table>


            </div>
        </div>
    )
}

export default Leaderboard