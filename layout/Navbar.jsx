/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components'

import { CiShare1, CiSearch } from 'react-icons/ci'
import { BsHandbag } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'

import { PrimaryButton } from '../components/Buttons'
import { removeToken } from '../redux/features/tokenSlice';
import { logoutUser } from '../redux/features/userSlice';

import { revertToInitialState, updateProduct } from '../redux/features/cartSlice';
import { getProjectDetails } from '../redux/apiCalls';

const Nav = styled.nav`
    background-color: ${props => props.theme.body};
    z-index: 90;
`
const ListItems = styled.li`
    list-style: none;
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
const Results = styled.div`
    background-color: ${props => props.theme.body};
    border: 0.5px solid ${props => props.theme.text}50;
`
const Item = styled.div`
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
        background-color: ${props => props.theme.text}15;
    }

`
const Navbar = ({ handleCart, handleLogin, openMenu }) => {
    const { user } = useSelector(state => state.user)
    const { isLogged } = useSelector(state => state.token)
    const { quantity } = useSelector(state => state.cart)
    const { products } = useSelector(state => state.products)
    const router = useRouter();

    console.log(quantity)

    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if (search === '') {
            setSearchResult([])
        }
        else {
            const result = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
            setSearchResult(result)
        }
    }, [products, search])

    const getActive = (path) => {
        if (router.pathname === path) {
            return true;
        }
        return false;
    }
    const handleLogout = () => {
        dispatch(removeToken())
        dispatch(logoutUser())
        dispatch(revertToInitialState())
        router.push('/')
    }

    const handleDetails = (link) => {
        setSearch('')
        router.push(`/product/${link}`);
        getProjectDetails(dispatch, link)
    }

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
                {
                    searchResult.length > 0 && 
                    <Results className='flex flex-col gap-y-4 rounded-md absolute top-14 w-full'>
                        {
                            searchResult.map((product, index) => (
                                <Item className='flex gap-x-4 items-center' key={index} onClick={() => handleDetails(product.slug)}>
                                    <img src={product.gallery[0].image} alt={product.name} className='h-16 w-16' />

                                    <div className='flex flex-col'>
                                        <p>{product.name}</p>
                                        <h2>Rs. {product.price}</h2>
                                    </div>
                                </Item>
                            ))
                        }
                    </Results>
                }
            </SearchWrapper>

            <div className='flex gap-x-8 lg:gap-x-16 items-center'>
                <ul className='flex gap-x-8'>
                    <ListItems className='hidden lg:flex' active={getActive('/market')}>
                        <CiShare1 />
                        <p>Leagues</p>
                    </ListItems>
                    
                    <ListItems className='flex'>
                        <div className='relative cursor-pointer' onClick={handleCart}>
                            <BsHandbag />
                            <span className='absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-white font-medium flex items-center justify-center text-[14px]'>{quantity === undefined ? 0 : quantity}</span>
                        </div>
                    </ListItems>
                </ul>

                {
                    isLogged ? 
                    // <PrimaryButton text='Logged in' onClick={() => dispatch(removeToken())} />
                    <img src={user.avatar} className='w-8 h-8 lg:w-12 lg:h-12 rounded-full object-cover' alt={user.name} onClick={handleLogout}/>
                    :
                    <PrimaryButton text='Sign In' onClick={handleLogin} />
                }
            </div>

            {/* <FiMenu className='lg:hidden text-[21px]' onClick={openMenu}/> */}
        </Nav>
    )
}

export default Navbar