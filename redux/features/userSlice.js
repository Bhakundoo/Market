import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
    user: [],
    isFetching: false,
    error: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.user = action.payload;
            state.error = false;
        },
        logoutUser: (state) => {
            state.user = [];
            state.error = false;
            state.isFetching = false;
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { getUserStart, getUserSuccess, logoutUser, getUserFailure } = userSlice.actions;
export default userSlice.reducer;