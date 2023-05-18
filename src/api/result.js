import axios from '../axiosConfig';

const createResultApi = async (quizId, answers, token) => {
    return await axios.post(
        '/results/create',
        {
            quizId,
            answers,
        },
        { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
}

const getQuizResultApi = async (quizId, token) => {
    return await axios.get('/results/get/' + quizId, { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
}

export { createResultApi, getQuizResultApi };