/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import Form from '../../components/CheckoutComponents/Form'
import UserModal from '../../components/CheckoutComponents/UserModal'
import UserSummary from '../../components/CheckoutComponents/UserSummary'

import HeadSEO from '../../layout/HeadSEO'

const Checkout = () => {
  const [open, setOpen] = useState(false)
  const { user, isFetching } = useSelector(state => state.user)
  const { products, isFetching: cartFetching } = useSelector(state => state.cart)

  if(isFetching || cartFetching) {
    return (
      <>
        <HeadSEO title="Checkout" />
        <div className='flex flex-col w-full h-screen items-center justify-center'>
          <p>Loading...</p>
        </div>
      </>
    )
  }

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
          />
          <UserSummary
            username={user.username}
            email={user.email}
            avatar={user.avatar}
            total={products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}
            vat={products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * 0.13}
          />
        </div>

        {
          open &&
          <UserModal
            username={user.username}
            email={user.email}
            avatar={user.avatar}
            total={products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}
            vat={products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * 0.13}
            show={open}
            onClose={() => setOpen(false)}
          />
        }
      </main>
    </>
  )
}

export default Checkout