import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentQuestion: 0,
    correctlyAnsweredQuestions: [],
    answeredQuestions: []
}

export const quiz = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        reset: () => initialState,
        setCurrentQuestion: (state, action) => {
            console.log(action.payload)
            state.currentQuestion = action.payload
        },
    }
})

export const {
    reset,
    setCurrentQuestion,
} = quiz.actions
export default quiz.reducer
