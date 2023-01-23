import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        //
    },
    reducers: {
        SET_AUTH_DATA: (state, action) => {
            return action.payload
        }
    }
})

export const {SET_AUTH_DATA} = authSlice.actions

export default authSlice.reducer;
