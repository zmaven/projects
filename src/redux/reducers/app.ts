import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signInSteps } from '@/utils/constants';

type AppInitialStateProps = {
    authCurrentStep: string;
    authIsBack: boolean;
    signInForm: {
        email: string;
        password: string;
    };
    startFetchLoading: boolean;
};

const initialState: AppInitialStateProps = {
    authCurrentStep: signInSteps.LOGIN,
    authIsBack: false,
    signInForm: { email: '', password: '' },
    startFetchLoading: false
};

export const app = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthCurrentStep: (state, action: PayloadAction<string>) => {
            state.authCurrentStep = action.payload;
        },
        setAuthIsBack: (state, action: PayloadAction<boolean>) => {
            state.authIsBack = action.payload;
        },
        setSignInForm: (
            state,
            action: PayloadAction<{ email: string; password: string }>
        ) => {
            state.signInForm = { ...action.payload };
        },
        setStartFetchLoading: (state, action: PayloadAction<boolean>) => {
            state.startFetchLoading = action.payload;
        }
    }
});

export const {
    setAuthCurrentStep,
    setAuthIsBack,
    setSignInForm,
    setStartFetchLoading
} = app.actions;
export default app.reducer;
