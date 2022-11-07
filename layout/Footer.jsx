import React from 'react'
import styled from 'styled-components'

import { CiFacebook, CiInstagram } from 'react-icons/ci'

const Foot = styled.div`
    border-color: ${props => props.theme.primary};

    svg {
        font-size: 36px;
        color: ${props => props.theme.primary};
    }
`
const Copyright = styled.div`
    background-color: ${props => props.theme.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    p {
        color: ${props => props.theme.body};
    }
`

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className='w-full'>
            <Foot className='max-w-[1366px] flex flex-col items-center border-t-[1px] mx-auto mt-16 mb-4 p-4'>
                <h2>Bhakundoo Market.</h2>
                <div className='mt-4 flex flex-col gap-y-2 items-center'>
                    <p>Find Us At.</p>
                    <div className='flex gap-x-4 items-center'>
                        <CiFacebook onClick={() => window.open('https://www.facebook.com/bhakundoo8', '_blank')}/>
                        <CiInstagram onClick={() => window.open('https://www.instagram.com/bhakundoo/', '_blank')}/>
                    </div>
                </div>
            </Foot>

            <Copyright>
                <p>Copyright ⓒ {year}. All rights reserved.</p>
            </Copyright>
        </div>
    )
}

export default Footer