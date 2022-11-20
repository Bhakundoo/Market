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
            // if products is empty, set quantity to 0
            if(state.products === [] || state.products === null || state.products === undefined) {
                state.quantity = 0;
            } else {
                state.quantity = state.products.length;
            }
            // state.total += action.payload.product.price;
        },
        // updateQuantity: (state) => {
        //     state.isFetching = false;
        //     state.error = false;
        //     state.quantity = (state.products).length;
        // },
        revertToInitialState: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.isFetching = false;
            state.error = false;
        },
        cartFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { cartStart, updateProduct, revertToInitialState, cartFailure } = cartSlice.actions
export default cartSlice.reducer;
