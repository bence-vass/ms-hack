import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    pathList: '',
}


export const navigator = createSlice({
    name: 'navigator',
    initialState,
    reducers: {
        reset: () => initialState,
        update_path: (state, action) => {
            state.pathList = action.payload
        }
    }
})


export const {update_path} = navigator.actions
export default navigator.reducer
