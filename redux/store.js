import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import navigatorReducer from './features/navigator/navigatorSlice'
import quizReducer from './features/quiz/quizSlice'

export const store = configureStore({
    reducer: {
        counterReducer,
        quizReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})


