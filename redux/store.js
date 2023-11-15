import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import navigatorReducer from './features/navigator/navigatorSlice'

export const store = configureStore({
    reducer: {
        counterReducer,
        navigatorReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})


