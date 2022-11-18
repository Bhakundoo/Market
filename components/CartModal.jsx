/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'

import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai'
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5'

import { PrimaryButton } from './Buttons'
import { updateProduct } from '../redux/features/cartSlice'

const Backdrop = styled.div`
    background-color: ${props => props.theme.primary}25;
    backdrop-filter: blur(4px);
    overflow: hidden;
    z-index: 99;
`
const Cart = styled.div`
    background-color: ${props => props.theme.body};
    height: 100%;
    padding: 1.75rem 2rem;
    overflow-y: auto;
    transition: all 0.3s ease-in-out;

    transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};

    display: flex;
    flex-direction: column;

    svg {
        font-size: 27px;
        color: ${props => props.theme.text};
    }

    // no scrollbar for all browsers
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`
const Card = styled.div`
    background-color: ${props => props.theme.white};
    border-radius: 14px;
    padding: 1rem;
`
const Icon = styled.div`
    position: relative;

    svg {
        cursor: pointer;
        color: red;
    }

    &::before {
        content: '';
        width: 1px;
        height: 1px;
        background-color: #f40e1e;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s ease;
        filter: blur(5px);
    }

    &:hover::before {
        opacity: 1;
        transform: scale(2.5);
    }
`
const SmallIcon = styled.div`
    background-color: ${props => props.theme.primary}25;
    border-radius: 4px;
    padding: 0.25rem;

    &:hover {
        background-color: ${props => props.theme.primary}50;
    }

    svg {
        font-size: 16px;
        color: ${props => props.theme.text};
    }
`
const Quantity = styled.div`
    input {
        width: 2rem;
        text-align: center;
        border-bottom: 1px solid ${props => props.theme.primary};
        background-color: transparent;
        color: ${props => props.theme.primary};

        &:focus {
            outline: none;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            display: none;
        }
        &[type=number] {
            -moz-appearance: textfield;
        }
    }
`

const CartModal = ({ show, onClose, setShow }) => {
    const { products, total } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const router = useRouter()

    if(products.length <= 0) {
        return (
            <Backdrop className='flex w-full h-screen fixed top-0 left-0 justify-end' show={show}>
                <Cart className='h-full w-full md:w-1/2 xl:w-1/4 flex flex-col justify-center items-center animate-slide-left' show={show}>
                    <img src='/icons/cart.svg' alt='Cart Icon' className='w-20 h-auto' />
                    <p className='opacity-50'>So Empty.</p>
                    <PrimaryButton onClick={() => {setShow({ ...show, cart: false })}} className='mt-4' text='Shop Now' additionalClass={'mt-4'}/>
                </Cart>
            </Backdrop>
        )
    }

    return (
        <Backdrop className='flex w-full h-screen fixed top-0 left-0 justify-end' show={show}>
            <Cart className='h-full w-full md:w-1/2 xl:w-1/4 flex flex-col justify-between animate-slide-left' show={show}>
                <div className='flex flex-col gap-y-16'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-normal'>Your Cart</h1>
                        <AiOutlineClose onClick={onClose}/>
                    </div>

                    <div className='flex flex-col gap-4'>
                        {
                            products.map((item, index) => (
                                <Card key={index} className='flex gap-4 items-center'>
                                    <img src={item.product.gallery[0].image} alt={item.product.name} className='w-24 h-24 flex-shrink-0 object-cover' />

                                    <div className='w-full flex flex-col gap-y-4'>
                                        {/* <div className='flex flex-col justify-center gap-x-4'> */}
                                            <p className='font-normal'>{item.product.name}</p>
                                            {/* <div className='flex items-end'>
                                                <p className='font-light'>Rs.</p>
                                                <h2 className='font-bold'>{item.product.price}</h2>
                                            </div> */}
                                            <Icon>
                                                <AiOutlineDelete className='text-[21px] text-red-800' onClick={() => dispatch(updateProduct({
                                                    _id: item.product._id,
                                                    price: item.product.price
                                                }))}/>
                                            </Icon>
                                        {/* </div> */}

                                        {/* <div className='flex justify-between items-center'>
                                            <Quantity className='flex gap-x-4'>
                                                <SmallIcon onClick={handleDecrease}>
                                                    <IoRemoveOutline />
                                                </SmallIcon>
                                                <input 
                                                    type='number'
                                                    value={item.quantity}
                                                    onChange={changeQuantity}
                                                />
                                                <SmallIcon onClick={handleIncrease}>
                                                    <IoAddOutline />
                                                </SmallIcon>
                                            </Quantity>

                                            <Icon>
                                                <AiOutlineDelete className='text-[21px] text-red-800' onClick={() => dispatch(updateProduct(item.slug))}/>
                                            </Icon>
                                        </div> */}
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                </div>

                <div className='flex flex-col gap-y-4 border-t-[2px] border-t-[#14141525] border-dashed py-4'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-normal'>Subtotal</h2>
                        <div className='flex items-center gap-x-2'>
                            <p className='font-light'>Rs.</p>
                            {/* calculate total of all items by formula price * quantity */}
                            <h1>
                                {
                                    products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
                                }
                            </h1>
                        </div>
                    </div>

                    <PrimaryButton inverted={false} additionalClass={'w-full'} text='Checkout' onClick={() => {router.push('/checkout'); setShow({ ...show, cart: false})}}/>
                </div>
            </Cart>
        </Backdrop>
    )
}

export default CartModal