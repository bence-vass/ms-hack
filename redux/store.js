import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import navigatorReducer from './features/navigator/navigatorSlice'
import quizReducer from './features/quiz/quizSlice'
import heatmapReducer from './features/heatmap/heatmapSlice'

export const store = configureStore({
    reducer: {
        counterReducer,
        quizReducer,
        heatmapReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})


