import { useEffect, useState } from "react";
import "./Alert.css";

export default function Alert({ type, messages }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        if(Object.keys(messages).length === 1) {
            setContent(Object.values(messages)[0])
        } else if(Object.keys(messages).length > 1) {
            setContent(() => {
                const msgs = Object.values(messages)
                const text = msgs.map(msg => <li key={msg}>{msg}</li>)
                return <ul>{text}</ul>
            })
        } else {
            setContent("Something went wrong")
        }
    }, [type, messages])

    return (
        <div className={`Alert ${type}`}>
            {content}
        </div>
    )
}