import axios from '../axiosConfig';

const createQuestionApi = async (quizId, question, options, answer, token) => {
    console.log(quizId)
    return await axios.post(
        '/questions/create',
        {
            quizId,
            question,
            options,
            answer,
        },
        { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
}

const getQuestionApi = async (questionId, token) => {
    return await axios.get('/questions/get/' + questionId, { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
}

const updateQuestionApi = async (questionId, question, options, answer, token) => {
    return await axios.put(
        '/questions/update/' + questionId,
        {
            question,
            options,
            answer,
        },
        { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
}

const deleteQuestionApi = async (questionId, token) => {
    return await axios.delete('/questions/delete/' + questionId, { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
}

export { createQuestionApi, getQuestionApi, updateQuestionApi, deleteQuestionApi };