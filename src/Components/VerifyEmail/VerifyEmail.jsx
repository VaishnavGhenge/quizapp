import { Redirect } from "react-router-dom";
import axios from "../../axiosConfig"
import "./VerifyEmail.css"
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";


function VerifyEmail() {
    const state = useSelector(state => state.verify_email);
    const [resendMessage, setResendMessage] = useState({status: "resend-default", message: ""});
    const history = useHistory();

    if (!state.email) {
        history.push("/signup");
    }

    function handleResend(event) {
        event.preventDefault();

        try {
            axios.post("/users/resend-email", { email: state.email })
                .then(res => {
                    setResendMessage({status: "resend-success", message: "Email resent successfully"});
                })
                .catch(err => {
                    setResendMessage({status: "resend-error", message: err.response.data.message || err.message ||"Error occured while resending email"});
                })
        } catch (error) {
            setResendMessage({status: "resend-error", message: error.response.data.message || error.message || "Error occured while resending email"});
        }
    }

    return (
        <div className="verify-email">
            <div className="verify-prompt">
                <h3 className="verify-title">Please verify your mail</h3>
                <div className="verify-body">
                    <p>You are almost there, we have sent you an email on <b className="email-text">{state.email}</b></p>
                    <p>Just click on the link in email to complete your signup.</p>
                    <p>If you don't see it, you may need to <b>check your spam</b> folder</p>
                </div>

                <form onSubmit={handleResend}>
                    <p className={`${resendMessage.status}`}>{resendMessage.message}</p>
                    <div className="res-btn-group">
                        <button className="btn-resend" type="submit">Resend Email</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail;