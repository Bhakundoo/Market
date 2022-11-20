import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.primary};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transform: ${props => props.show ? 'translateY(0)' : 'translateY(-100%)'};
    transition: all 0.3s ease-in-out;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ListItem = styled.li`
    list-style: none;
    color: ${props => props.theme.body};
    font-size: 21px;
    cursor: pointer;
`

const ResNavbar = ({ show, close }) => {
    const router = useRouter();

    const getActive = (r) => {
        if (r === router.pathname) return 'line-through'
        else return 'none'
    }

    return (
        <Container show={show}>
            <ul className='flex flex-col gap-y-8'>
                <ListItem onClick={() => close(false)}>CLOSE</ListItem>
                <ListItem className={`${getActive('/')}`} onClick={() => {close; router.push()}}>HOME</ListItem>
                <ListItem className={`${getActive('/')}`} onClick={() => {close; }}>CART</ListItem>
                <ListItem className={`${getActive('/')}`} onClick={() => {close; }}>LOGIN</ListItem>
            </ul>
        </Container>
    )
}

export default ResNavbar