import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
    category: [],
    isFetching: false,
    error: false,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategoryStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getCategorySuccess: (state, action) => {
            state.isFetching = false;
            state.category = action.payload;
            state.error = false;
        },
        getCategoryFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { getCategoryStart, getCategorySuccess, getCategoryFailure } = categorySlice.actions;
export default categorySlice.reducer;