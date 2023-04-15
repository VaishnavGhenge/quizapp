import { createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi } from '../api/auth';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token'),
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            localStorage.setItem('user', action.payload.user);
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state, action) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});

const { login, logout } = authSlice.actions;

export const loginAsync = (username, password) => async (dispatch) => {
    try {
        const res = await loginApi(username, password);
        dispatch(login(res.data));
        return { success: true, message: res.data.message };
    } catch (err) {
        return { success: false, message: (err.response.data.message || err.message ) };
    }
};

export const logoutAsync = (username) => async (dispatch) => {
    try {
        const res = await logoutApi(username);
        dispatch(logout());
        return { success: true, message: res.data.message };
    } catch (err) {
        return { success: false, message: (err.response.data.message || err.message ) };
    }
};

export default authSlice.reducer;
