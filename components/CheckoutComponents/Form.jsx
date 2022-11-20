/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styled from 'styled-components'

import { cartItems } from '../../data/cartItems'
import { PrimaryButton } from '../Buttons'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import UserModal from './UserModal'
import { useSelector } from 'react-redux'

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
    const [address, setAddress] = useState({
        state: '',
        city: '',
        street: '',
    })
    const [phone, setPhone] = useState('')

    const { products } = useSelector(state => state.cart);

    return (
        <Container className='flex-1 flex flex-col gap-y-12 overflow-auto'>
            <div className='flex items-center justify-between'>
                <h1>Checkout</h1>
                <AiOutlineInfoCircle className='text-[24px] lg:hidden' onClick={onOpen}/>
            </div>
            <div className='flex flex-col gap-y-8'>
                <h2>Product Information</h2>
                <div className='flex flex-col gap-y-4'>
                    {
                        products.map((item, index) => (
                            <Card key={index} className='flex gap-x-4 items-center'>
                                <img src={item.product.gallery[0].image} alt={item.product.name} className='w-24 h-24 object-cover' />

                                <div className='flex flex-col gap-y-4'>
                                    <div>
                                        <p>{item.product.name}</p>
                                        <p className='opacity-60'>x{item.quantity}</p>
                                    </div>
                                    <h2>Rs. {item.product.price}</h2>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col gap-y-8'>
                <div className='flex items-center justify-between'>
                    <h2>Shipping Information</h2>
                </div>
                <form className='flex flex-col gap-y-4'>
                    <div className='flex flex-col md:flex-row gap-8 flex-wrap'>
                        <div className='flex flex-col'>
                            <label htmlFor='state'>State</label>
                            <Input 
                                type='text'
                                id='state'
                                value={address.state}
                                onChange={e => setAddress({...address, state: e.target.value})}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='city'>City</label>
                            <Input 
                                type='text'
                                id='city'
                                value={address.city}
                                onChange={e => setAddress({...address, city: e.target.value})}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='street'>Street</label>
                            <Input 
                                type='text'
                                id='street'
                                value={address.street}
                                onChange={e => setAddress({...address, street: e.target.value})}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='phone'>Phone Number</label>
                            <Input 
                                type='tel'
                                id='phone'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
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