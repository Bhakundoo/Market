import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
    token: '',
    isLogged: false,
    error: false,
}

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        storeToken: (state, action) => {
            state.token = action.payload;
            state.isLogged = true;
            state.error = false;
        },
        removeToken: (state) => {
            state.token = '';
            state.isLogged = false;
            state.error = false;
        }
    }
})

export const { storeToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;