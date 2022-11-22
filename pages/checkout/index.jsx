/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { PrimaryButton } from '../../components/Buttons'

import Form from '../../components/CheckoutComponents/Form'
import UserModal from '../../components/CheckoutComponents/UserModal'
import UserSummary from '../../components/CheckoutComponents/UserSummary'

import HeadSEO from '../../layout/HeadSEO'

const Checkout = () => {
  const [open, setOpen] = useState(false)
  const { user, isFetching } = useSelector(state => state.user)
  const { products, isFetching: cartFetching } = useSelector(state => state.cart)

  const router = useRouter()

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

  console.log(products)

  if(products.length < 1) {
    return (
      <>
        <HeadSEO title="Checkout" 
          description="Checkout page for the user to checkout the products in the cart" 
        />
        
        <div className='flex flex-col w-full h-[80vh] items-center justify-center gap-y-8'>
          <div className='flex flex-col gap-y-2 items-center'>
            <img src='/icons/cart.svg' alt='Cart Icon' className='w-20 h-auto mb-4' />
            <p className='opacity-50'>Nothing to Order</p>
            <p className='opacity-50'>Add some awesome products to your cart.</p>
          </div>
          <PrimaryButton onClick={() => router.push('/')} text='Explore'/>
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