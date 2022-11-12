import axiosInstance from '../utils/axios.config';
import { getCategoryFailure, getCategoryStart, getCategorySuccess } from './features/categorySlice';
import { getFeaturedProductsFailure, getFeaturedProductsStart, getFeaturedProductsSuccess } from './features/featuredSlice';
import { getProductDescSuccess, getProductsFailure, getProductsStart, getProductsSuccess } from "./features/productsSlice";

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