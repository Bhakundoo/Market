import React, { useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../../utils/axios.config'
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { PrimaryButton, TextButton } from '../Buttons'
import { GoogleLogin } from 'react-google-login';

const Input = styled.input`
    font-size: 16px;
    font-weight: 300;
    padding: 0.75rem 1rem;
    border: 1px solid ${props => props.theme.primary}50;
    border-radius: 4px;
    outline: none;
    background: transparent;

    &:focus {
        border: 1px solid ${props => props.theme.primary};
    }
`

const Login = ({ onClose, handleRegister }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [show, setShow] = useState(false)
    const responseGoogle = async (response) => {
        try {
            
            console.log(response.tokenId);
            alert('Login Success')
            
        } catch (err) {
            console.log(err);
           
        }
    }
    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex justify-between items-center'>
                <h1>Welcome Back</h1>
                <AiOutlineClose className='text-[21px]' onClick={onClose}/>
            </div>

            <form className='flex flex-col gap-y-4'>
                <div className='flex flex-col gap-y-2'>
                    <label>Email Address</label>
                    <Input 
                        type='email' 
                        value={data.email}
                        onChange={e => setData({...data, email: e.target.value})}
                    />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label>Password</label>
                    <div className='w-full relative'>
                        <Input type={show ? 'password' : 'text'} value={data.password} onChange={(e) => setData({ ...data, password: e.target.value})} className='w-full'/>
                        {
                            show ?
                            <AiOutlineEyeInvisible className='absolute top-1/2 right-4 transform -translate-y-1/2 text-[21px]' onClick={() => setShow(!show)}/>
                            :
                            <AiOutlineEye className='absolute top-1/2 right-4 transform -translate-y-1/2 text-[21px]' onClick={() => setShow(!show)}/>
                        }
                    </div>
                </div>
                <PrimaryButton text='Login' additionalClass='mt-8'/>
                <TextButton text='Create an account' onClick={handleRegister}/>


                {/* Google login */}
                <GoogleLogin
                    clientId="993778502578-f3e60js9hmv8sr45aempevjha5n816kd.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

            </form>
        </div>
    )
}

export default Login