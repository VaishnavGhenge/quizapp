import "./Login.css"
import close from "../assets/close-line.svg"

export default function Login(props) {
    return (
        <div className="Login">
            <div className="login-box">
                <div className="top">
                    <img src={close} alt="close icon" className="close-icon" onClick={() => props.setLogin(false)} />
                    <div className="login-text">Login here</div>
                    <hr />
                </div>
                <div className="login-body">
                    <form action="" className="login-form">
                        <div className="input-group">
                            <input type="text" name="username" id="username" className="input-box" placeholder="Username" />
                            <input type="password" name="passowrd" id="password" className="input-box" placeholder="Password" />
                        </div>
                        <div className="btn-div">
                            <button className="btn-login-form">
                                Login
                            </button>
                            <button className="btn-login-with">
                                Login with
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}