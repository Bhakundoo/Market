/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import Tabbar from '../../components/ProductComponent/Tab/Tabbar';
import HeadSeo from '../../layout/HeadSEO';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartItems, getProducts, getProjectDetails } from '../../redux/apiCalls';
import { updateProduct, updateQuantity } from '../../redux/features/cartSlice';
import axiosInstance from '../../utils/axios.config';

const ColoredText = styled.p`
    color: ${props => props.color ? 'green' : 'red'};
    font-weight: 500;
    font-size: 16px;

    @media (max-width: 800px) {
        font-size: 14px;
    }

    @media (max-width: 425px) {
        font-size: 12px;
    }
`
const Sizes = styled.button`
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;

    span {
        color: ${props => props.selected ? props.theme.body : props.theme.primary};
        z-index: 1;
    }

    &::before {
        content: '';
        position: absolute;
        width: ${props => props.selected ? '200%' : '0px'};
        height: ${props => props.selected ? '200%' : '0px'};
        background-color: ${props => props.theme.primary};
        opacity: ${props => props.selected ? '1' : '0'};
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    &:hover {
        &::before {
            background-color: ${props => props.selected ? '' : props.theme.primary}15;
            opacity: 1;
            width: 200%;
            height: 200%;
        }
    }
`
const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;

    position: absolute;
    bottom: 2rem;
    left: 45%;
`

const ProductDetail = () => {
    const { productDesc, isFetching } = useSelector(state => state.products);
    const { products } = useSelector(state => state.cart);
    const { token, isLogged } = useSelector(state => state.token);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    
    const router = useRouter();
    // const { slug } = router.query;

    // useEffect(() => {
    //     getProjectDetails(dispatch, slug);
    //     // console.log('Working')
    // }, [dispatch, slug])
    
    useEffect(() => {
        if(error) {
            setTimeout(() => {
                setError(false);
            }, 3000)
        }
    })

    const [selectedVariant, setSelectedVariant] = useState({
        size: productDesc?.sizes[0],
        variant: productDesc?.variations[0],
        image: '',
    });

    useEffect(() => {
        const displayImage = productDesc?.gallery[0].image;

        setSelectedVariant({
            ...selectedVariant,
            image: displayImage,
        })
    }, [productDesc])

    const [quantity, setQuantity] = useState(1);
    const changeValue = (e) => {
        if(e.target.value < 0) {
            e.target.value = 0;
        }
        else if (e.target.value > productDesc?.stock) {
            e.target.value = productDesc?.stock;
        }
        setQuantity(e.target.value);
    }
    const increase = () => {
        if(quantity < 1) {
            setQuantity(1);
        }
        if (quantity > productDesc?.stock) {
            setQuantity(productDesc?.stock);
        }
        else {
            setQuantity(quantity + 1);
        }
    }
    const decrease = () => {
        if(quantity <= 1) {
            setQuantity(1);
        }
        else {
            setQuantity(quantity - 1);
        }
    }
    const handleAddToProduct = async() => {
        // const cartData = [{ product: productDesc._id, quantity: quantity }]
        if(isLogged) {
            addToCart(dispatch, productDesc._id, quantity, selectedVariant.size, selectedVariant.variant, token);
            getCartItems(dispatch, token);
        }
        else {
            setError(true);
        }
    }


    if(isFetching) {
        return (
            <div className='flex justify-center items-center h-screen'>
                Loading...
            </div>
        )
    }

    return (
        <>
            <HeadSeo 
                title={productDesc?.name}
                description={`Buy ${productDesc?.name} from Bhakundoo Market.`}
            />

            <div className='w-full min-h-[650px] relative'>
                <div className='w-full lg:w-[1366px] h-full mx-auto flex flex-col lg:flex-row gap-y-8 gap-x-16 mb-40'>
                    <div className='lg:flex-1 place-self-center'>
                        <img src={selectedVariant.image} alt={productDesc?.name} layout='fill' objectFit='contain' className='w-auto h-[200px] lg:h-[500px]'/>
                    </div>

                    <div className='lg:flex-1 flex flex-col gap-y-8'>
                        <div className='pb-4 border-b-[1px] border-b-[#14141515]'>
                            <h1>{productDesc?.name}</h1>
                            <div className='flex justify-between'>
                                <p>{productDesc?.category?.name}</p>
                                <ColoredText color={productDesc?.stock > 0}>{productDesc?.stock > 0 ? 'In Stock' : 'Out of Stock'}</ColoredText>
                            </div>
                        </div>

                        {/* <div className='flex flex-col gap-y-4'>
                            <h2>Ratings</h2>
                            <div className='flex gap-x-4 flex-wrap'>
                                <div className='flex items-center gap-x-2'>
                                    {
                                        Array(Math.floor(productDesc?.rating))
                                        .fill()
                                        .map((_, i) => (
                                            <AiFillStar key={i} className='w-5 h-5 text-yellow-400'/>
                                        ))
                                    }
                                    {
                                        Array(5 - Math.floor(productDesc?.rating))
                                        .fill()
                                        .map((_, i) => (
                                            <AiOutlineStar key={i} className='w-5 h-5 text-yellow-400'/>
                                        ))
                                    }
                                    <p>{productDesc?.rating}</p>
                                </div>
                            </div>
                        </div> */}

                        <div className='flex flex-col gap-y-4'>
                            <h2>Sizes</h2>
                            <div className='flex gap-x-4 flex-wrap'>
                                {productDesc?.sizes.map((size, index) => (
                                    <Sizes 
                                        selected={size === selectedVariant.size} 
                                        key={index} 
                                        className='w-[40px] h-[40px] rounded-full border-[1px] border-[#14141515] flex items-center justify-center'
                                        onClick={() => setSelectedVariant({...selectedVariant, size: size})}
                                    >
                                        <span>{size}</span>
                                    </Sizes>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-4'>
                            <h2>Variants</h2>
                            <div className='flex gap-x-4'>
                                {productDesc?.variations.map((variant, index) => (
                                    <Sizes
                                        key={index}
                                        selected={variant.toLocaleLowerCase() === (selectedVariant.variant).toLocaleLowerCase()}
                                        className='w-fit h-[40px] px-8 rounded-full border-[1px] border-[#14141515] flex items-center justify-center'
                                        onClick={() => setSelectedVariant({...selectedVariant, variant: variant, image: productDesc?.gallery[index]?.image})}
                                    >
                                        <span>{variant}</span>
                                    </Sizes>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Tabbar 
                    price={productDesc?.price} 
                    quantity={quantity}
                    changeQuantity={changeValue}
                    handleIncrease={increase}
                    handleDecrease={decrease}
                    onClick={handleAddToProduct}
                    slug={productDesc?.slug}
                />

                {
                    error &&
                    <Error className='animate-slide-up'>
                        Please login to add items to cart.
                    </Error>
                }
            </div>
        </>
    )
}

export default ProductDetail