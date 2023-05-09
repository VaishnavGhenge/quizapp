import { createSlice } from '@reduxjs/toolkit';

const verifyEmailSlice = createSlice({
    name: 'verify_email',
    initialState: {
        email: localStorage.getItem('email'),
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload.email;
            localStorage.setItem('email', action.payload.email);
        },
        deleteEmail : (state, action) => {
            state.email = null;
            localStorage.removeItem('email');
        }
    }
});

const { setEmail, deleteEmail } = verifyEmailSlice.actions;

export const setEmailAsync = (email) => async (dispatch) => {
    try {
        dispatch(setEmail({ email }));
        return { success: true, message: 'Email set successfully' };
    } catch (err) {
        return { success: false, message: (err.response.data.message || err.message ) };
    }
};

export const deleteEmailAsync = () => async (dispatch) => {
    try {
        dispatch(deleteEmail());
        return { success: true, message: 'Email deleted successfully' };
    } catch (err) {
        return { success: false, message: (err.response.data.message || err.message ) };
    }
};

export default verifyEmailSlice.reducer;
