/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styled from 'styled-components';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import Tabbar from '../../components/ProductComponent/Tab/Tabbar';
import HeadSeo from '../../layout/HeadSEO';

const ColoredText = styled.p`
    color: ${props => props.stock ? '#FF0000' : '#00B87C'};
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

const ProductDetail = () => {
    const [product, setProduct] = useState({
        name: 'Brazil World Cup 2022/23 Kit',
        price: 1000,
        img: '/jerseys/brazil/home.webp',
        rating: 4.5,
        numReviews: 10,
        variants: ['Home', 'Away', 'Third', 'Keeper'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'National Kit',
        stock: 10,
    });

    const [selectedVariant, setSelectedVariant] = useState({
        size: 'S',
        variant: 'Home',
    });

    
    const [quantity, setQuantity] = useState(null);
    const changeValue = (e) => {
        if(e.target.value < 0) {
            e.target.value = 0;
        }
        else if (e.target.value > product.stock) {
            e.target.value = product.stock;
        }
        setQuantity(e.target.value);
    }
    const increase = () => {
        if(quantity < 0) {
            setQuantity(0);
        }
        if (quantity > product.stock) {
            setQuantity(product.stock);
        }
        else {
            setQuantity(quantity + 1);
        }
    }
    const decrease = () => {
        if(quantity <= 0) {
            setQuantity(0);
        }
        else {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            <HeadSeo 
                title={product.name}
                description={`Buy ${product.name} from Bhakundoo Market.`}
            />

            <div className='w-full min-h-[650px] relative'>
                <div className='w-full lg:w-[1366px] h-full mx-auto flex flex-col lg:flex-row gap-y-8 gap-x-16 mb-40'>
                    <div className='lg:flex-1 place-self-center'>
                        <img src={product.img} alt={product.name} layout='fill' objectFit='contain' className='w-auto h-[200px] lg:h-[500px]'/>
                    </div>

                    <div className='lg:flex-1 flex flex-col gap-y-8'>
                        <div className='pb-4 border-b-[1px] border-b-[#14141515]'>
                            <h1>{product.name}</h1>
                            <div className='flex justify-between'>
                                <p>{product.category}</p>
                                <ColoredText color={product.stock > 0}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</ColoredText>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-4'>
                            <h2>Ratings</h2>
                            <div className='flex gap-x-4 flex-wrap'>
                                <div className='flex items-center gap-x-2'>
                                    {
                                        Array(Math.floor(product.rating))
                                        .fill()
                                        .map((_, i) => (
                                            <AiFillStar key={i} className='w-5 h-5 text-yellow-400'/>
                                        ))
                                    }
                                    {
                                        Array(5 - Math.floor(product.rating))
                                        .fill()
                                        .map((_, i) => (
                                            <AiOutlineStar key={i} className='w-5 h-5 text-yellow-400'/>
                                        ))
                                    }
                                    <p>{product.rating}</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-4'>1
                            <h2>Sizes</h2>
                            <div className='flex gap-x-4 flex-wrap'>
                                {product.sizes.map((size, index) => (
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
                                {product.variants.map((variant, index) => (
                                    <Sizes
                                        key={index}
                                        selected={variant.toLocaleLowerCase() === (selectedVariant.variant).toLocaleLowerCase()}
                                        className='w-fit h-[40px] px-8 rounded-full border-[1px] border-[#14141515] flex items-center justify-center'
                                        onClick={() => setSelectedVariant({...selectedVariant, variant: variant})}
                                    >
                                        <span>{variant}</span>
                                    </Sizes>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Tabbar 
                    price={product.price} 
                    quantity={quantity}
                    changeQuantity={changeValue}
                    handleIncrease={increase}
                    handleDecrease={decrease}
                />
            </div>
        </>
    )
}

export default ProductDetail