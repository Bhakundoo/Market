import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import { AiOutlineHeart } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { addProduct } from '../../../redux/features/cartSlice'
import { getProjectDetails } from '../../../redux/apiCalls'
import { useDispatch } from 'react-redux'

const Container = styled.div`
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    background: linear-gradient(180deg, ${props => props.theme.body} 0%, ${props => props.theme.white} 100%), #FFFFFF;
    border-radius: 8px;
    padding: 1rem;
`
const ImageWrapper = styled.div`
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: #fff;
    }
`

const Card = ({ img, name, price, link }) => {
    const router = useRouter()

    const dispatch = useDispatch()
    const onClick = () => {
        router.push(`/product/${link}`);
        getProjectDetails(dispatch, link)
    }

    return (
        <Container className='w-full md:w-56 flex flex-col gap-4' onClick={onClick}>
            <ImageWrapper className='w-auto h-64'>
                <Image id='img' src={img} alt={'jersey'} layout='fill' objectFit='contain' className='absolute mix-blend-multiply' />
            </ImageWrapper>

            <div className='flex flex-col'>
                <p className='truncate capitalize'>{name}</p>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-x-2'>
                        <h2>Rs.</h2>
                        <h2>{price}</h2>
                    </div>

                    <AiOutlineHeart className='text-[#ff0000] text-[21px]' />
                </div>
            </div>
        </Container>
    )
}

export default Card