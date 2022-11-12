import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
    featured: [],
    isFetching: false,
    error: false,
}

const featuredSlice = createSlice({
    name: "featured",
    initialState,
    reducers: {
        getFeaturedProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getFeaturedProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.featured = action.payload;
            state.error = false;
        },
        getFeaturedProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { getFeaturedProductsStart, getFeaturedProductsSuccess, getFeaturedProductsFailure } = featuredSlice.actions;
export default featuredSlice.reducer;