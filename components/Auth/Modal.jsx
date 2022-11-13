import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Login from './Login'
import Register from './Register'

const Backdrop = styled.div`
    background-color: ${props => props.theme.primary}25;
    backdrop-filter: blur(4px);
    z-index: 99;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    background-color: ${props => props.theme.body};
    max-height: 600px;
    border-radius: 8px;
    padding: 1.75rem 2rem;
    overflow-y: auto;

    transition: height 0.3s ease-in-out;

    // make scrollbar invisible for all browsers
    &::-webkit-scrollbar {
        width: 0;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const Modal = ({ onClose }) => {
    const [inLogin, setInLogin] = useState(true)

    return (
        <Backdrop className='w-full h-screen fixed top-0 left-0'>
            <Wrapper className='w-11/12 md:w-1/2 lg:w-1/3 animate-slide-up'>
                {
                    inLogin ? <Login onClose={onClose} handleRegister={() => setInLogin(false)} /> : <Register onClose={onClose} handleLogin={() => setInLogin(true)} />
                }
            </Wrapper>
        </Backdrop>
    )
}

export default Modal