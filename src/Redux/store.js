import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import emailReducer from './verifyEmail';

const store = configureStore({
    reducer: {
        auth: authReducer,
        verify_email: emailReducer
    }
});

export default store;
