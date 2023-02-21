import "./Navbar.css"

export default function Navbar(props) {
    return (
        <div className="Navbar">
            <div className="nav">
                <div className="logo-title">quizzical</div>
                <button className="btn-login" onClick={() => props.setLogin(prev => !prev)}>Login</button>
            </div>
            <hr />
        </div>
    )
}