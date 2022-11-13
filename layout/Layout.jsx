/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Modal from '../components/Auth/Modal'
import CartModal from '../components/CartModal'
import { useThemeContext } from '../context/ThemeContextProvider'

import { themes } from '../context/Themes'
import Global from '../styles/Global'
import Navbar from './Navbar'

const Root = styled.div`
  background-color: ${props => props.theme.body};
  width: 100%;
`
const Layout = ({ children }) => {
  const { theme, setTheme } = useThemeContext();
  const [show, setShow] = useState({
    modal: false,
    cart: false,
  });

  useEffect(() => {
    const darkMode = localStorage.getItem('dark');
    if (darkMode === null) {
      localStorage.setItem('dark', 'false');
    }
    else if (darkMode === 'true') {
      setTheme?.(themes.dark);
    } else {
      setTheme?.(themes.light);
    }
  }, [])

  useEffect(() => {
    if(show.modal === true) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'unset';
    }
  }, [show])

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
          <Navbar handleCart={() => setShow({ modal: false, cart: true })}  handleLogin={() => setShow({ cart: false, modal: true})} />
          { children }
        </div>
      </Root>
    </ThemeProvider>
  )
}

export default Layout