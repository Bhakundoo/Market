/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styled from 'styled-components'

import { Personal, Summary, Total } from './UserSummary'

const Backdrop = styled.div`
    background-color: ${props => props.theme.primary}25;
    backdrop-filter: blur(4px);
    overflow: hidden;
    z-index: 99;
`

const UserModal = ({ username, email, total, avatar, onClose }) => {
  return (
    <Backdrop className='flex w-full h-screen fixed top-0 left-0 justify-center items-center' onClick={onClose}>
        <Summary className='flex w-11/12 h-max flex-col gap-8'>
            <Personal>
                <img src={avatar} alt={username} className='w-28 h-28 rounded-full mx-auto' />
                <div className='flex flex-col items-center'>
                    <h2>{username}</h2>
                    <p className='opacity-60'>{email}</p>
                </div>
            </Personal>

            <div className='w-2/3 mx-auto flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <p className='opacity-40'>Order ID</p>
                <p className='font-semibold'><span className='font-light text-[10px] md:text-[12px] lg:text-[14px]'>#</span> 123456789</p>
            </div>
            
            <div className='flex justify-between items-center'>
                <p className='opacity-40'>Total Price</p>
                <p className='font-semibold'><span className='font-light text-[10px] md:text-[12px] lg:text-[14px]'>Rs.</span> {total}</p>
            </div>

            <div className='flex justify-between items-center'>
                <p className='opacity-40'>Delivery Charge</p>
                <p className='font-semibold'><span className='font-light text-[10px] md:text-[12px] lg:text-[14px]'>Rs.</span>100</p>
            </div>

            <div className='flex justify-between items-center'>
                <p className='opacity-40'>VAT (13%)</p>
                <p className='font-semibold'><span className='font-light text-[10px] md:text-[12px] lg:text-[14px]'>Rs.</span>{vat}</p>
            </div>
            </div>

            <Total>
                <p>Sub-Total</p>
                <h2><span className='font-light text-[12px] md:text-[14px] lg:text-[16px]'>Rs.</span>{total + vat}</h2>
            </Total>
        </Summary>
    </Backdrop>
  )
}

export default UserModal