/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styled from 'styled-components'

import Form from '../../components/CheckoutComponents/Form'
import UserModal from '../../components/CheckoutComponents/UserModal'
import UserSummary from '../../components/CheckoutComponents/UserSummary'

import HeadSEO from '../../layout/HeadSEO'

const Checkout = () => {
  const [open, setOpen] = useState(false)

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
        <div className='w-full h-[80vh] flex justify-between gap-x-12 overflow-hidden'>
          <Form 
            onOpen={() => setOpen(true)}
            dcity={user.city}
            dstate={user.state}
            dstreet={user.street}
          />
          <UserSummary
            firstName={user.firstName}
            lastName={user.lastName}
            phone={user.phone}
            avatar={user.avatar}
          />
        </div>

        {
          open &&
          <UserModal
            firstName={user.firstName}
            lastName={user.lastName}
            phone={user.phone}
            avatar={user.avatar}
            show={open}
            onClose={() => setOpen(false)}
          />
        }
      </main>
    </>
  )
}

export default Checkout