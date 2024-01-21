import {configureStore} from '@reduxjs/toolkit';
import navReducer from './ReduxSlices/navSlice';   //createSlice name="nav" + Reducer = navReducer

export const store = configureStore({
    reducer: {
        nav: navReducer,
    },
});