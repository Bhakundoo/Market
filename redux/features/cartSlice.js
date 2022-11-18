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
        updateProduct: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products = action.payload.product;
            // state.total += action.payload.product.price;
        },
        updateQuantity: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.quantity = action.payload;
        },
        cartFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { cartStart, updateProduct, updateQuantity, cartFailure } = cartSlice.actions
export default cartSlice.reducer;
