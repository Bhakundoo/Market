import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { IoRemoveOutline, IoAddOutline } from 'react-icons/io5'

import { DisabledButton, PrimaryButton, SecondaryButton } from '../../Buttons'
import { useSelector } from 'react-redux'

const Tab = styled.div`
    background-color: ${props => props.theme.primary};
    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: center;
    margin: 0 auto;

    color: ${props => props.theme.body};
`
const Wrapper = styled.div`
    input {
        width: 2rem;
        text-align: center;
        border-bottom: 1px solid ${props => props.theme.body};
        background-color: transparent;
        color: ${props => props.theme.body};
    
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
const Icon = styled.div`
    cursor: pointer;
    background-color: ${props => props.theme.body}25;
    padding: 0.5rem;
    border-radius: 4px;

    &:hover {
        background-color: ${props => props.theme.body}50;
    }
    svg {
        font-size: 18px;
        color: ${props => props.theme.body};
    }
`

const Tabbar = ({ price, quantity, changeQuantity, handleDecrease, handleIncrease, onClick, slug }) => {
    const { products } = useSelector(state => state.cart)

    const [showButton, setShowButton] = useState(true)

    useEffect(() => {
        // if products includes the product, then hide the button
        if (products.find(product => product.slug === slug)) {
            setShowButton(false)
        }
    }, [products, slug])

    return (
        <Tab className='w-full fixed bottom-0 left-1/2 -translate-x-1/2 z-20'>
            <Wrapper className='w-full lg:w-[1366px] flex flex-col lg:flex-row gap-y-4 justify-between items-center'>
                <div className='flex gap-x-1 items-end'>
                    <p>Rs.</p>
                    <h2 className='font-bold'>{price}</h2>
                </div>
                <div className='flex gap-x-8 items-center'>
                    <div className='flex gap-x-4'>
                        <Icon onClick={handleDecrease}>
                            <IoRemoveOutline/>
                        </Icon>
                        <input 
                            type='number'
                            value={quantity}
                            onChange={changeQuantity}
                        />
                        <Icon onClick={handleIncrease}>
                            <IoAddOutline/>
                        </Icon>
                    </div>
                    {
                        showButton ?
                        <PrimaryButton text='Add To Cart' inverted={true} onClick={onClick} />   
                        :
                        <DisabledButton text='Already In Cart' />
                    }
                </div>
            </Wrapper>
        </Tab>
    )
}

export default Tabbar