import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isInstance: false,
    data: {max: 0, data: []},
    reset: false,
}

export const heatmap = createSlice({
    name: 'heatmap',
    initialState,
    reducers: {
        reset: () => initialState,
        setInstance: (state, action) => {
            state.isInstance = true
        },
        setData: (state, action) => {
            state.data = action.payload
        },
        resetData: (state, action) => {
            state.data = {max: 0, data: []}
        }


    }
})

export const {
    reset,
    setData,
    resetData,
} = heatmap.actions

export default heatmap.reducer
