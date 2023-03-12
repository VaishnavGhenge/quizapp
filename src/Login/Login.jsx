import "./Login.css"
import close from "../assets/close-line.svg"
import google from "../assets/google-fill.svg"

export default function Login(props) {
    return (
        <div className="Login" style={{'display': props.display, 'opacity': props.display === 'block'? '1' : '0'}}>
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
                            <div className="btn-login-form">
                                <span>Login</span>
                            </div>
                            <div className="btn-login-with">
                                <span>Login with</span>
                                <img src={google} className="google-logo" alt="google icon" />
                            </div>
                        </div>
                    </form>
                    <div className="login-footer">
                        <p className="signup-link">New here? <span>create new account</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}