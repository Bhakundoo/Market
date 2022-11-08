/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styled from 'styled-components'

const Summary = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 8px;
  padding: 0 1.5rem 1.5rem 1.5rem;
`
const Personal = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.body};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 0 0 8px 8px;
  justify-content: end;
  align-items: center;
`
const Total = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  border-top: 1px dashed ${({ theme }) => theme.primary}25;
  display: flex;
  justify-content: space-between;
`

const UserSummary = ({ phone, firstName, lastName, avatar }) => {
  return (
    <Summary className='flex-[0.5] flex flex-col  gap-8'>
        <Personal>
        <img src={avatar} alt={firstName + lastName} className='w-28 h-28 rounded-full mx-auto' />
        <div className='flex flex-col items-center'>
            <h2>{firstName + " " + lastName}</h2>
            <p className='opacity-60'>{phone}</p>
        </div>
        </Personal>

        <div className='w-2/3 mx-auto flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
            <p className='opacity-40'>Order ID</p>
            <p className='font-semibold'><span className='font-light text-[10px] md:text-[12px] lg:text-[14px]'>#</span> 123456789</p>
        </div>
        
        <div className='flex justify-between items-center'>
            <p className='opacity-40'>Total Price</p>
            <p className='font-semibold'><span className='font-light text-[10px] md:text-[12px] lg:text-[14px]'>Rs.</span> 3000</p>
        </div>

        <div className='flex justify-between items-center'>
            <p className='opacity-40'>Delivery Charge</p>
            <p className='font-semibold'><span className='font-light text-[10px] md:text-[12px] lg:text-[14px]'>Rs.</span>100</p>
        </div>

        <div className='flex justify-between items-center'>
            <p className='opacity-40'>VAT (13%)</p>
            <p className='font-semibold'><span className='font-light text-[10px] md:text-[12px] lg:text-[14px]'>Rs.</span>390</p>
        </div>
        </div>

        <Total>
        <p>Sub-Total</p>
        <h2><span className='font-light text-[12px] md:text-[14px] lg:text-[16px]'>Rs.</span>3,490</h2>
        </Total>
    </Summary>
  )
}

export default UserSummary