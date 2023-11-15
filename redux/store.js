import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'

export const store = configureStore({
    reducer: {
        counterReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})


