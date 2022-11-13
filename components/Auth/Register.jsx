import React, { useState } from 'react'
import styled from 'styled-components'

import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { PrimaryButton, TextButton } from '../Buttons'

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
const Chip = styled.div`
    font-size: 16px;
    font-weight: 300;
    padding: 0.75rem 1rem;
    border: 1px solid ${props => props.theme.primary}25;
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    background: ${props => props.selected ? props.theme.primary : 'transparent'};
    color: ${props => props.selected ? props.theme.body : props.theme.primary};
`

const Register = ({ onClose, handleLogin }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        state: '',
        street: '',
        gender: 'Male',
        dob: '',
    })
    const [show, setShow] = useState(false)

    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex justify-between items-center'>
                <h1>Create Account</h1>
                <AiOutlineClose className='text-[21px]' onClick={onClose}/>
            </div>

            <form className='flex flex-col gap-y-4'>
                <div className='flex gap-x-4'>
                    <div className='flex-1 flex flex-col gap-y-2'>
                        <label>First Name</label>
                        <Input type='text' value={data.firstName}/>
                    </div>
                    <div className='flex-1 flex flex-col gap-y-2'>
                        <label>Last Name</label>
                        <Input type='text' value={data.lastName}/>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label>Email Address</label>
                    <Input 
                        type='email' 
                        value={data.email}
                        onChange={e => setData({...data, email: e.target.value})}
                    />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label>Gender</label>
                    <div className='flex gap-x-4'>
                        <Chip selected={data.gender === 'Male'} onClick={() => setData({ ...data, gender: 'Male'})}>Male</Chip>
                        <Chip selected={data.gender === 'Female'} onClick={() => setData({ ...data, gender: 'Female'})}>Female</Chip>
                    </div>
                </div>
                <div className='flex gap-x-4 flex-wrap'>
                    <div className='flex-1 flex flex-col gap-y-2'>
                        <label>State</label>
                        <Input type='text' value={data.state} onChange={(e) => setData({ ...data, state: e.target.value})}/>
                    </div>
                    <div className='flex-1 flex flex-col gap-y-2'>
                        <label>City</label>
                        <Input type='text' value={data.city} onChange={(e) => setData({ ...data, city: e.target.value})}/>
                    </div>
                    <div className='flex-1 flex flex-col gap-y-2'>
                        <label>Street</label>
                        <Input type='text' value={data.street} onChange={(e) => setData({ ...data, street: e.target.value})}/>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label>Phone Number</label>
                    <Input type='phone' value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value})}/>
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

                <PrimaryButton text='Register' additionalClass='mt-8'/>

                <TextButton text='Go To Login' onClick={handleLogin}/>
            </form>
        </div>
    )
}

export default Register