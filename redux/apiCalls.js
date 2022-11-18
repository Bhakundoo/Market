import axiosInstance from '../utils/axios.config';
import { updateProduct, cartFailure, cartStart } from './features/cartSlice';
import { getCategoryFailure, getCategoryStart, getCategorySuccess } from './features/categorySlice';
import { getFeaturedProductsFailure, getFeaturedProductsStart, getFeaturedProductsSuccess } from './features/featuredSlice';
import { getProductByCategorySuccess, getProductDescSuccess, getProductsFailure, getProductsStart, getProductsSuccess } from "./features/productsSlice";

export const getProducts = async(dispatch) => {
    dispatch(getProductsStart())

    try {
        const res = await axiosInstance.get("/products");
        dispatch(getProductsSuccess(res.data.products));
    } catch (err) {
        dispatch(getProductsFailure());
    }
}
export const getFeaturedProducts = async(dispatch) => {
    dispatch(getFeaturedProductsStart())

    try {
        const res = await axiosInstance.get("/products/featured");
        dispatch(getFeaturedProductsSuccess(res.data.products));
    } catch (err) {
        dispatch(getFeaturedProductsFailure());
    }
}
export const getProjectDetails = async(dispatch, slug) => {
    dispatch(getProductsStart())

    try {
        const res = await axiosInstance.get(`/product/${slug}`);
        dispatch(getProductDescSuccess(res.data.product));
    } catch (err) {
        dispatch(getProductsFailure());
    }
}

export const getCategories = async(dispatch) => {
    dispatch(getCategoryStart())

    try {
        const res = await axiosInstance.get("/categories");
        dispatch(getCategorySuccess(res.data.category));
    } catch (err) {
        dispatch(getCategoryFailure());
    }
}
export const getProductByCategories = async(dispatch, slug) => {
    dispatch(getProductsStart())

    try {
        const res = await axiosInstance.get(`/products/category/${slug}`);
        dispatch(getProductByCategorySuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
}

export const addToCart = async(dispatch, product, quantity, token) => {
    dispatch(cartStart());

    const data = [{ product, quantity }];
    try {
        const res = await axiosInstance.post("/user/addcart", data, {
            headers: {
                "Authorization": `${token}`
            }
        });
        dispatch(updateProduct(res.data.newcart));
        // dispatch(updateProduct(res.data.newCart));
    } catch (err) {
        dispatch(cartFailure());
        console.log(err);
    }
}

export const getCartItems = async(dispatch, token) => {
    dispatch(cartStart());

    try {
        const res = await axiosInstance.get("/user/getcart", {
            headers: {
                "Authorization": `${token}`
            }
        });
        dispatch(updateProduct(res.data.cart));
    } catch (err) {
        dispatch(cartFailure());
        console.log(err);
    }
}

// export const getUserInfo = async(dispatch, token, userInfo) => {
//     dispatch(getUserInfoStart())

//     try {
//         const res = await axiosInstance.post("/user", {
//             headers: {
//                 Authorization: token
//             }
//         });
//         dispatch(getUserInfoSuccess(res.data.user));
//     } catch (err) {
//         dispatch(getUserInfoFailure());
//     }
// }