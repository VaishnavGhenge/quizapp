import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "../../axiosConfig"
import "./VerifyEmail.css"
import { useState } from "react";

function CheckEmailToken() {
    const { code } = useParams();
    const history = useHistory();
    const [verifyMessage, setVerifyMessage] = useState({status: "verify-default", message: ""});
    const [countdown, setCountdown] = useState(5);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        let intervalId = null;
        axios.post("/users/verify-email", { code })
            .then(res => {
                setVerifyMessage({status: "verify-success", message: "Email verified successfully"});
                const newIntervalId = setInterval(() => {
                    setCountdown(prevCount => prevCount - 1);
                }, 1000);
                setIntervalId(newIntervalId);
            })
            .catch(err => {
                console.log(err)
                setVerifyMessage({status: "verify-error", message: err.response.data.message || err.message || "Error occured while verifying email"});
            })
    }, [code]);

    useEffect(() => {
        if (countdown === 0) {
          clearInterval(intervalId);
          history.push("/");
        }
    }, [countdown])

    return (
        <div className="verify-email">
            <div className="verify-prompt">
                <h4 className={`${verifyMessage.status}`}>{verifyMessage.message}</h4>
                {verifyMessage.status === "verify-success" && <p>You will be redirected to home for login in {countdown} seconds</p>}
            </div>
        </div>
    )
} 

export default CheckEmailToken;