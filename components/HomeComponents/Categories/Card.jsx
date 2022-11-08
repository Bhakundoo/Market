import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { PrimaryButton } from '../../Buttons'

const Overlay = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${props => props.theme.primary} 100%);

    @media (max-width: 768px) {
        top: 0;
    }
`
const Container = styled.div`
    &:hover ${Overlay}{
        top: 0;
    }
`

const Card = ({ img, heading, desc }) => {
  return (
    <Container className='w-full lg:flex-1 h-[300px] lg:h-[600px] relative overflow-hidden'>
        <Image src={img} alt={'jersey'} layout='fill' objectFit='cover' className='absolute rounded-md' />
        <Overlay className='rounded-md'>
            <div className='flex flex-col justify-end h-full px-8 py-4'>
                <h1 className='text-white'>{heading}</h1>
                <p className='text-white'>{desc}</p>
                <PrimaryButton text='Shop Now' additionalClass='mt-4 w-fit' inverted={true}/>
            </div>
        </Overlay>
    </Container>
  )
}

export default Card