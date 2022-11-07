/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import React, { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useThemeContext } from '../context/ThemeContextProvider'

import { themes } from '../context/Themes'
import Global from '../styles/Global'
import Footer from './Footer'
import Navbar from './Navbar'

const Root = styled.div`
  background-color: ${props => props.theme.body};
  width: 100%;
`
const Layout = ({ children }) => {
  const { theme, setTheme } = useThemeContext();

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

  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Root>
        <div className='w-full min-h-screen gap-y-12 px-4'>
          <Navbar />
          { children }
          <Footer />    
        </div>
      </Root>
    </ThemeProvider>
  )
}

export default Layout