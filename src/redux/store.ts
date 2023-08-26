import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {
    appReducer,
    authReducer,
    draftReducer,
    photoReducer,
    projectReducer
} from './reducers';

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        draft: draftReducer,
        photo: photoReducer,
        project: projectReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
