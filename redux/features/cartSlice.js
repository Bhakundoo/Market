import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        product_quantity: {
            product_slug: '',
            quantity: 0
        }
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload.productDesc);
            state.total += action.payload.productDesc.price * action.payload.quantity;
            state.product_quantity.product_slug = action.payload.productDesc.slug;
            state.product_quantity.quantity = action.payload.quantity;
            console.log(action.payload.productDesc.price);
        },
        removeProduct: (state, action) => {
            state.quantity -= 1;
            state.products = state.products.filter(
                (product) => product.slug !== action.payload.slug
            );
            state.total -= action.payload.productDesc.price * action.payload.quantity;
        }
    },
});

export const { addProduct, removeProduct } = cartSlice.actions
export default cartSlice.reducer;
