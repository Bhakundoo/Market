import React from 'react'
import { useState } from 'react'

import styled from 'styled-components'
import { GoogleLogin } from 'react-google-login';

import Login from './Login'
import Register from './Register'
import { AiOutlineClose, AiOutlineGoogle } from 'react-icons/ai';
import { IconButton } from '../Buttons';

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
    // const [inLogin, setInLogin] = useState(true)
    const responseGoogle = async (response) => {
        try {
            
            console.log(response.tokenId);
            alert('Login Success')
            
        } catch (err) {
            console.log(err);
           
        }
    }
    return (
        <Backdrop className='w-full h-screen fixed top-0 left-0'>
            <Wrapper className='w-11/12 md:w-1/2 lg:w-1/3 animate-slide-up flex flex-col gap-y-4'>
                <div className='flex flex-col gap-y-8'>
                    <div className='flex justify-between'>
                        <h1>Get Started</h1>
                        <AiOutlineClose className='text-[21px]' onClick={onClose}/>
                    </div>

                    <p className='opacity-60'>Login using your google account and start purchasing kits of your favourite team.</p>
                </div>

                {/* {
                    inLogin ? <Login onClose={onClose} handleRegister={() => setInLogin(false)} /> : <Register onClose={onClose} handleLogin={() => setInLogin(true)} />
                } */}

                {/* Google login */}
                <GoogleLogin
                    clientId="993778502578-f3e60js9hmv8sr45aempevjha5n816kd.apps.googleusercontent.com"
                    render={renderProps => (
                        <IconButton 
                            onClick={renderProps.onClick} 
                            icon={<AiOutlineGoogle />}
                        />
                    )}
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

            </Wrapper>
        </Backdrop>
    )
}

export default Modal