import "./CreateQuiz.css"
import { useEffect, useState } from "react"
import { createQuestionApi, updateQuestionApi } from "../../api/question"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

export default function CreateQuestion(props) {
    const [data, setQuestion] = useState(props.que);
    const [inputMessage, setInputMessage] = useState({ question: { status: 'default', message: 'hello' }, option1: { status: 'default', message: '' }, option2: { status: 'default', message: '' }, option3: { status: 'default', message: '' }, option4: { status: 'default', message: '' }, answer: { status: 'default', message: '' } });
    const [formMessage, setFormMessage] = useState({ status: 'default', messages: { form: '' } });
    const state = useSelector(state => state.auth);
    const history = useHistory();
    const [syncedQue, setSyncedQue] = useState(false);
    const [queType, setQueType] = useState(props.que.questionId ? 'edit' : 'create');

    if (!state.user) {
        history.push("/");
    }

    useEffect(() => {
        if (data.questionId) {
            setSyncedQue(true);
        }
    }, [])

    // console.log(data);
    function handleChange(e) {
        const { name, value } = e.target;

        if (formMessage.status !== 'default' && formMessage.status !== 'loading') {
            setFormMessage({ status: 'default', messages: { form: '' } });
        }

        if (syncedQue) {
            setSyncedQue(false);
        }

        if (name.substring(0, 6) === 'option') {
            setQuestion(que => {
                return {
                    ...que,
                    options: que.options.map((option, index) => {
                        if (index === parseInt(name[6]) - 1) {
                            return value;
                        }
                        else {
                            return option;
                        }
                    })
                }
            })
        } else {
            setQuestion(que => {
                return {
                    ...que,
                    [name]: value
                }
            })
        }
    }

    function validateInput() {
        if (data.question == '') {
            setInputMessage(inputMessage => {
                return {
                    ...inputMessage,
                    question: { status: 'error', message: 'Question cannot be empty' }
                }
            })
            return true;
        }
        else if (data.option1 == '') {
            setInputMessage(inputMessage => {
                return {
                    ...inputMessage,
                    option1: { status: 'error', message: 'Option cannot be empty' }
                }
            })
            return true;
        }
        else if (data.option2 == '') {
            setInputMessage(inputMessage => {
                return {
                    ...inputMessage,
                    option2: { status: 'error', message: 'Option cannot be empty' }
                }
            })
            return true;
        }
        else if (data.option3 == '') {
            setInputMessage(inputMessage => {
                return {
                    ...inputMessage,
                    option3: { status: 'error', message: 'Option cannot be empty' }
                }
            })
            return true;
        }
        else if (data.option4 == '') {
            setInputMessage(inputMessage => {
                return {
                    ...inputMessage,
                    option4: { status: 'error', message: 'Option cannot be empty' }
                }
            })
            return true;
        }
        else if (data.answer == '') {
            setInputMessage(inputMessage => {
                return {
                    ...inputMessage,
                    answer: { status: 'error', message: 'Answer cannot be empty' }
                }
            })
            return true;
        }
        else {
            return false;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (validateInput()) {
            return;
        }

        setInputMessage(inputMessage => {
            return {
                ...inputMessage,
                question: { status: 'default', message: '' },
                option1: { status: 'default', message: '' },
                option2: { status: 'default', message: '' },
                option3: { status: 'default', message: '' },
                option4: { status: 'default', message: '' },
                answer: { status: 'default', message: '' }
            }
        })

        setFormMessage(formMessage => {
            return {
                ...formMessage,
                status: 'loading',
                messages: { form: 'Saving Question' }
            }
        })

        if (queType === 'create') {
            createQuestionApi(props.quizId, data.question, data.options, data.answer, state.token)
                .then(res => {
                    setFormMessage(formMessage => {
                        return {
                            ...formMessage,
                            status: 'success',
                            messages: { form: 'Question Saved' }
                        }
                    })
                })
                .catch(err => {
                    setFormMessage(formMessage => {
                        return {
                            ...formMessage,
                            status: 'error',
                            messages: { form: 'Error Saving Question' }
                        }
                    })
                })
        } else {
            updateQuestionApi(data.questionId, data.question, data.options, data.answer, state.token)
                .then(res => {
                    console.log(res);
                    setFormMessage(formMessage => {
                        return {
                            ...formMessage,
                            status: 'success',
                            messages: { form: 'Question Saved' }
                        }
                    })
                }
                )
                .catch(err => {
                    console.log(err);
                    setFormMessage(formMessage => {
                        return {
                            ...formMessage,
                            status: 'error',
                            messages: { form: 'Error Saving Question' }
                        }
                    })
                }
                )
        }
    }

    return (
        <div className="CreateQuestion">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor={`question${data.questionId || data.queId}`} className="input-label">Question</label>
                    <input className="question-input" type="text" name="question" id={`question${data.questionId || data.queId}`} value={data.question} onChange={handleChange} />
                    {inputMessage.question.status != 'default' && <span className={`input-mes-${inputMessage.question.status}`}>{inputMessage.question.message}</span>}
                </div>
                <div className="create-options">
                    <div className="option_group_wrapper">
                        <div className="option-group">
                            <label htmlFor={`option1${data.questionId || data.queId}`} className="inputlabel">Option A</label>
                            <input className="create-option" type="text" name="option1" id={`option1${data.questionId || data.queId}`} value={data.options[0]} onChange={handleChange} />
                            {inputMessage.option1.status != 'default' && <span className={`input-mes-${inputMessage.option1.status}`}>{inputMessage.option1.message}</span>}
                        </div>
                        <div className="option-group">
                            <label htmlFor={`option2${data.questionId || data.queId}`} className="input-label">Option B</label>
                            <input className="create-option" type="text" name="option2" id={`option2${data.questionId || data.queId}`} value={data.options[1]} onChange={handleChange} />
                            {inputMessage.option2.status != 'default' && <span className={`input-mes-${inputMessage.option2.status}`}>{inputMessage.option2.message}</span>}
                        </div>
                    </div>
                    <div className="option_group_wrapper">
                        <div className="option-group">
                            <label htmlFor={`option3${data.questionId || data.queId}`} className="input-label">Option C</label>
                            <input className="create-option" type="text" name="option3" id={`option3${data.questionId || data.queId}`} value={data.options[2]} onChange={handleChange} />
                            {inputMessage.option3.status != 'default' && <span className={`input-mes-${inputMessage.option3.status}`}>{inputMessage.option3.message}</span>}
                        </div>
                        <div className="option-group">
                            <label htmlFor={`option4${data.questionId || data.queId}`} className="input-label">Option D</label>
                            <input className="create-option" type="text" name="option4" id={`option4${data.questionId || data.queId}`} value={data.options[3]} onChange={handleChange} />
                            {inputMessage.option4.status != 'default' && <span className={`input-mes-${inputMessage.option4.status}`}>{inputMessage.option4.message}</span>}
                        </div>
                    </div>
                    <div className="option_group_wrapper">
                        <div className="option-group">
                            <label htmlFor={`answer${data.questionId || data.queId}`} className="input-label">Choose Answer</label>
                            <select name="answer" id={`answer${data.questionId || data.queId}`} className="create-select" value={data.answer} onChange={handleChange}>
                                <option value="">Select Answer</option>
                                {data.options[0] != '' && <option value={data.options[0]}>{data.options[0]}</option>}
                                {data.options[1] != '' && <option value={data.options[1]}>{data.options[1]}</option>}
                                {data.options[2] != '' && <option value={data.options[2]}>{data.options[2]}</option>}
                                {data.options[3] != '' && <option value={data.options[3]}>{data.options[3]}</option>}
                            </select>
                            {inputMessage.answer.status != 'default' && <span className={`input-mes-${inputMessage.answer.status}`}>{inputMessage.answer.message}</span>}
                        </div>
                        <div className="option-group">
                            <button type="submit" className="question-save" disabled={formMessage.status === 'loading' || formMessage.status === 'success' || syncedQue}>
                                {(formMessage.status === 'success' || syncedQue) && <span>Saved</span>}
                                {formMessage.status === 'loading' && <span className="loader"></span>}
                                {(formMessage.status === 'default' && !syncedQue) && <span>Save Question</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}