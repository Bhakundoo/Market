/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components'

import { CiShare1, CiSearch } from 'react-icons/ci'
import { BsHandbag } from 'react-icons/bs'
import { PrimaryButton } from '../components/Buttons'
import { removeToken } from '../redux/features/tokenSlice';

const Nav = styled.nav`
    background-color: ${props => props.theme.body};
    z-index: 90;
`
const ListItems = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    color: ${props => props.active ? props.theme.text : props.theme.text};
    background-color: ${props => props.theme.body};
    cursor: pointer;

    svg {
        font-size: 27px;
    }

    &:hover {
        color: ${props => props.theme.text};
    }

    img {
        flex-shrink: 0;
    }
`
const SearchWrapper = styled.div`
    position: relative;
    flex: 0.5;

    svg {
        position: absolute;
        right: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 27px;
        color: ${props => props.theme.text};
    }
    input {
        width: 100%;
        background-color: ${props => props.theme.body};
        border: 0.5px solid ${props => props.theme.text}50;
        border-radius: 6px;
        padding: 0.75rem 1.5rem;
        color: ${props => props.theme.text};

        &:focus {
            outline: none;
            background-color: ${props => props.theme.body};
        }
        &:focus svg {
            color: ${props => props.theme.body};
        }
    }
`
const Navbar = ({ handleCart, handleLogin }) => {
    const { user } = useSelector(state => state.user)
    const { isLogged } = useSelector(state => state.token)
    const { quantity } = useSelector(state => state.cart)
    const router = useRouter();

    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    const getActive = (path) => {
        if (router.pathname === path) {
            return true;
        }
        return false;
    }

    console.log(user, isLogged)

    return (
        <Nav className='max-w-[1366px] mx-auto py-4 flex justify-between items-center sticky top-0 mb-12'>
            <Link href='/'>
                <div className='h-6'>
                    <img src='/logo/light.jpg' alt='logo' className='h-full w-auto mix-blend-multiply' />
                </div>
            </Link>

            <SearchWrapper className='hidden lg:flex'>
                <input 
                    type='text'
                    placeholder='Search your favourite jersey'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <CiSearch />
            </SearchWrapper>

            <div className='hidden lg:flex gap-x-16 items-center'>
                <ul className='flex gap-x-8'>
                    <ListItems active={getActive('/market')}>
                        <CiShare1 />
                        <p>Leagues</p>
                    </ListItems>
                    
                    <ListItems>
                        <div className='relative cursor-pointer' onClick={handleCart}>
                            <BsHandbag />
                            <span className='absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-white font-medium flex items-center justify-center text-[14px]'>{quantity}</span>
                        </div>
                    </ListItems>
                </ul>

                {
                    isLogged ? 
                    // <PrimaryButton text='Logged in' onClick={() => dispatch(removeToken())} />
                    <img src={user.avatar} className='w-12 h-12 rounded-full object-cover' alt={user.name} onClick={() => dispatch(removeToken())}/>
                    :
                    <PrimaryButton text='Sign In' onClick={handleLogin} />
                }
            </div>
        </Nav>
    )
}

export default Navbar