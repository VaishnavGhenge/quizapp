import axios from '../axiosConfig';

const loginApi = async (username, password) => {
    return await axios.post('users/login', {
        username,
        password
    });
};

const logoutApi = async (username) => {
    return await axios.get(`users/logout/${username}`);
};

const createUserApi = async ({ name, username, password }) => {
    return await axios.post('users/create/', {
        name,
        username,
        password
    });
};

export { loginApi, createUserApi, logoutApi };
