import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthInitialStateProps = {
    email: string;
    password: string;
    user: {
        email: string;
        password: string;
        token: string;
    };
};

const initialState: AuthInitialStateProps = {
    email: '',
    password: '',
    user: {
        email: '',
        password: '',
        token: ''
    }
};

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (
            state,
            action: PayloadAction<{
                email: string;
                password: string;
                token: string;
            }>
        ) => {
            state.user = { ...action.payload };
        }
    }
});

export const { signIn } = slice.actions;
export default slice.reducer;
