/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from 'react-query'

import axiosInstance from '../utils/axios.config'

const fetchProducts = async() => {
    return await axiosInstance.get('/products')
}

export const useFetchProducts = (onSuccess, onError) => {
    return useQuery(
        'products',
        fetchProducts,
        {
            onSuccess: onSuccess,
            onError,
            select: (data) => {
                const { data: products } = data
                return products
            }
        }
    )
}