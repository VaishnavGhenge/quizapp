import "./Dashboard.css"
import Navbar from "../Navbar/Navbar"
import add from "../assets/add.svg"

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <Navbar purpose="dashboard" />
            <div className="dashboard-content">
                <div className="dashboar-controls">
                    <div className="create-new">
                        <img src={add} alt="grey add icon" className="add-icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}