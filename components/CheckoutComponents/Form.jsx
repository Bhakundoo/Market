/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axiosInstance from '../../utils/axios.config'

import { cartItems } from '../../data/cartItems'
import { PrimaryButton } from '../Buttons'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { sendMail } from '../../utils/sendMail'
import { Loading } from '../ProductComponent/Tab/Tabbar'
import { getCartItems } from '../../redux/apiCalls'

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
    flex: 1;
    background-color: ${props => props.theme.body};
    border: 1px solid ${props => props.theme.primary}50;
    border-radius: 8px;
    padding: 0.75rem 1rem;

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.primary};
    }
`
const Message = styled.div`
    background-color: ${props => props.color === 'error' ? '#f01a2925' : '#1af06b25'};
    border-radius: 8px;
    flex: 1;
    color: ${props => props.color === 'error' ? '#f01a29' : '#1af06b'};
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 400;
`

const Form = ({ onOpen }) => {
    const { products } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const { token } = useSelector(state => state.token);
    
    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState({
        email: user.email,
        phone: '',
        city: '',
        street: '',
        product_name: products.map(item => item.product.name).join(', '),
        size: products.map(item => item.size).join(', '),
        variant: products.map(item => item.variant).join(', '),
    })

    const formRef = useRef()

    const [message, setMessage] = useState({
        severity: 'warning',
        text: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(data.city === '' || data.street === '' || data.phone === '') {
            setMessage({
                type: 'error',
                text: 'Please fill in all fields',
            })
            return
        }

        try {
            setLoading(true)
            const res = await axiosInstance.post('/user/order', {
                city: data.city, 
                street: data.street, 
                phone: data.phone, 
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            if(res.status === 200) {
                getCartItems(dispatch, token)
                setTimeout(() => {
                    setMessage({
                        type: 'success',
                        text: 'Order placed successfully',
                    })
                    sendMail(setData, formRef, setLoading, setMessage)
                }, 2500)
            }
        }
        catch(err) {
            setLoading(false)
            console.log(err)
            setMessage({
                type: 'error',
                text: err.response.data.message,
            })
        }
    }

    useEffect(() => {
        if(message.text !== ''){
            setTimeout(() => {
                setMessage({
                    type: '',
                    text: '',
                })
            }, 5000)
        }
    }, [message.text])

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
                                <img 
                                    src={item.variant === 'Home' ? item.product.gallery[0].image : item.variant === 'Away' ? item.product.gallery[1].image : item.product.gallery[2].image}
                                    alt={item.product.name} 
                                    className='w-24 h-24 object-cover' 
                                />

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
                <form className='flex flex-col gap-y-4' ref={formRef} onSubmit={handleSubmit}>
                    <div className='flex flex-col md:flex-row gap-x-8 gap-y-4 flex-wrap'>
                        <div className='flex-1 flex flex-col'>
                            <label htmlFor='city'>City</label>
                            <Input 
                                type='text'
                                id='city'
                                value={data.city}
                                onChange={e => setData({...data, city: e.target.value})}
                            />
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <label htmlFor='street'>Street</label>
                            <Input 
                                type='text'
                                id='street'
                                value={data.street}
                                onChange={e => setData({...data, street: e.target.value})}
                            />
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <label htmlFor='phone'>Phone Number</label>
                            <Input 
                                type='tel'
                                id='phone'
                                value={data.phone}
                                onChange={e => setData({...data, phone: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='flex-1 flex gap-x-8 mt-8'>
                        {
                            loading ? 
                            <Loading />
                            :
                            <PrimaryButton text={'Place Order'} additionalClass='w-fit'/>
                        }
                        {
                            message.text !== '' && 
                            <Message color={message.type}>{message.text}</Message>
                        }
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Form