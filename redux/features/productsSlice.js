import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
    products: [],
    productDesc: {
        _id: "",
        category: "",
        gallery: [],
        sizes: [],
        variations: [],
    },
    productByCategory: {},
    isFetching: false,
    error: false,
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
        },
        getProductDescSuccess: (state, action) => {
            state.isFetching = false;
            state.productDesc = action.payload;
            state.error = false;
        },
        getProductByCategorySuccess: (state, action) => {
            state.isFetching = false;
            state.productByCategory = action.payload;
            state.error = false;
        },
        getProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { getProductsStart, getProductsSuccess, getProductDescSuccess, getProductByCategorySuccess, getProductsFailure } = productsSlice.actions;
export default productsSlice.reducer;