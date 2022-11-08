/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styled from 'styled-components'

import { cartItems } from '../../data/cartItems'
import { PrimaryButton } from '../Buttons'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import UserModal from './UserModal'

const Container = styled.div`
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`
const Card = styled.div`
    background-color: ${props => props.theme.white};
    border-radius: 8px;
    padding: 1rem;
`
const Input = styled.input`
    background-color: ${props => props.theme.body};
    border: 1px solid ${props => props.theme.primary}50;
    border-radius: 8px;
    padding: 0.75rem 1rem;

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.primary};
    }
`

const Form = ({ onOpen }) => {
    return (
        <Container className='flex-1 flex flex-col gap-y-12 overflow-auto'>
            <div className='flex items-center justify-between'>
                <h1>Checkout</h1>
                <AiOutlineInfoCircle className='text-[24px]' onClick={onOpen}/>
            </div>
            <div className='flex flex-col gap-y-8'>
                <h2>Product Information</h2>
                <div className='flex flex-col gap-y-4'>
                    {
                        cartItems.map((item, index) => (
                            <Card key={index} className='flex gap-x-4 items-center'>
                                <img src={item.img} alt={item.name} className='w-24 h-24 object-cover' />

                                <div className='flex flex-col gap-y-4'>
                                    <div>
                                        <p>{item.name}</p>
                                        <p className='opacity-60'>x{item.quantity}</p>
                                    </div>
                                    <h2>Rs. {item.price}</h2>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col gap-y-8'>
                <h2>Shipping Information</h2>
                <form className='flex flex-col gap-y-4'>
                    <div className='flex flex-col md:flex-row gap-8 flex-wrap'>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>State</label>
                            <Input 
                                type='text'
                                id='name'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>City</label>
                            <Input 
                                type='text'
                                id='name'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Street</label>
                            <Input 
                                type='text'
                                id='name'
                            />
                        </div>
                    </div>

                    <PrimaryButton text={'Place Order'} additionalClass='w-fit mt-8'/>
                </form>
            </div>
        </Container>
    )
}

export default Form