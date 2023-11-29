import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    data: {max: 0, data: []},
    toReset: false,
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
            state.toReset = !state.toReset
        }


    }
})

export const {
    reset,
    setData,
    resetData,
} = heatmap.actions

export default heatmap.reducer
