import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        isFetching: false,
        error: false,
    },
    reducers: {
        cartStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProduct: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products = action.payload.product;
            state.quantity += 1;
            // state.total += action.payload.product.price;
        },
        removeProduct: (state, action) => {
            state.quantity -= 1;
            // state.total -= action.payload.price;
            // state.products = state.products.filter((product) => product._id !== action.payload._id);
            state.products = action.payload.product;
            state.isFetching = false;
        },
        cartFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { cartStart, addProduct, removeProduct, cartFailure } = cartSlice.actions
export default cartSlice.reducer;
