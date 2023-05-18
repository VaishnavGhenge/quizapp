import axios from '../axiosConfig';

const createQuizApi = async (name, description, datetime, token) => {
    return await axios.post(
        '/quizzes/create',
        {
            name,
            description,
            datetime
        },
        { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
};

const getQuizApi = async (quizId, token) => {
    return await axios.get('/quizzes/get/' + quizId, { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
};

const getUserAllQuizzesApi = async (token) => {
    return await axios.get('/quizzes/get/user/all', { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
}

const deleteQuizApi = async (quizId, token) => {
    return await axios.delete('/quizzes/delete/' + quizId, { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
}

const getQuizQuestionsApi = async (quizId, token) => {
    return await axios.get('/quizzes/get/' + quizId + '/questions', { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
};

export { getQuizApi, createQuizApi, getUserAllQuizzesApi, deleteQuizApi, getQuizQuestionsApi };
