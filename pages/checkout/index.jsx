/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styled from 'styled-components'
import UserSummary from '../../components/CheckoutComponents/UserSummary'

import HeadSEO from '../../layout/HeadSEO'

const Checkout = () => {
  const [user, setUser] = useState({
    firstName: 'Hu',
    lastName: 'Tao',
    email: 'hu.tata@gmail.com',
    phone: '9860****84',
    street: 'Itumbahal',
    city: 'Kathmandu',
    state: 'Bagmati',
    avatar: 'https://i.pinimg.com/236x/44/ba/aa/44baaae7802ad46ca09f041398b947e5.jpg'
  })

  return (
    <>
      <HeadSEO 
        title="Checkout"
        description="Checkout page"
      />
      <main className='max-w-[1366px] mx-auto'>
        <div className='flex justify-between gap-x-12'>
          <div className='flex-1'>

          </div>
          <UserSummary
            firstName={user.firstName}
            lastName={user.lastName}
            phone={user.phone}
            avatar={user.avatar}
          />
        </div>
      </main>
    </>
  )
}

export default Checkout