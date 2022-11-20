/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'

import Modal from '../components/Auth/Modal'
import CartModal from '../components/CartModal'

import { useThemeContext } from '../context/ThemeContextProvider'
import { themes } from '../context/Themes'
import { getCartItems } from '../redux/apiCalls'
import { updateQuantity } from '../redux/features/cartSlice'

import Global from '../styles/Global'
import Navbar from './Navbar'
import ResNavbar from './ResNavbar'

const Root = styled.div`
  background-color: ${props => props.theme.body};
  width: 100%;
`
const Layout = ({ children }) => {
  const { isLogged, token } = useSelector(state => state.token)
  const { products, isFetching } = useSelector(state => state.cart)
  
  const dispatch = useDispatch()

  const { theme, setTheme } = useThemeContext();
  const [show, setShow] = useState({
    modal: false,
    cart: false,
  });

  const [isResNav, setIsResNav] = useState(false);

  useEffect(() => {
    if(show.modal === true) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'unset';
    }
  }, [show])

  useEffect(() => {
    if(isLogged) {
      getCartItems(dispatch, token)
    }
  }, [isLogged])


  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Root>
        <div className='w-full min-h-screen gap-y-12 px-4 relative'>
          {
            show.modal && <Modal show={show.modal} setShow={setShow} onClose={() => setShow({ ...show, modal: false })}/>
          }
          {
            show.cart && <CartModal show={show.cart} setShow={setShow} onClose={() => setShow({ ...show, cart: false })} />
          }
          <Navbar handleCart={() => setShow({ modal: false, cart: true })}  handleLogin={() => setShow({ cart: false, modal: true})} openMenu={() => setIsResNav(true)} />
          <ResNavbar show={isResNav} close={() => setIsResNav(false)}/>
          { children }
        </div>
      </Root>
    </ThemeProvider>
  )
}

export default Layout