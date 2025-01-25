import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import projectReducer from '../features/projectSlice';
import chatReducer from '../features/chatSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        chat: chatReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
