import React from 'react'
import styled from 'styled-components'

import { FaAngleLeft } from 'react-icons/fa'

const Btns = styled.div`
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.current ? props.theme.primary : props.theme.body};
    cursor: ${props => props.allowed ? 'pointer' : 'not-allowed'};
    opacity: ${props => props.allowed ? '1' : '0.6'};
    color: ${props => props.current ? props.theme.body : props.theme.primary};

    svg {
        color: ${props => props.current ? props.theme.body : props.theme.primary};
    }
`

const Pagination = ({ page, handleClickPage, handlePrev, handleNext }) => {
    console.log(page)
    const getCurrent = (index) => {
        if(page === index) {
            return true
        }
    }

    return (
        <div className='flex items-center gap-x-4'>
            <Btns onClick={handlePrev} allowed={page === 1 ? false : true}>
                <FaAngleLeft className='text-[21px]' />
            </Btns>
            {
                [1, 2, 3, 4, 5].map((item, index) => (
                    <Btns key={index} current={getCurrent(item)} onClick={handleClickPage} allowed={true}>
                        {item}
                    </Btns>
                ))
            }
            <Btns onClick={handleNext} allowed={page === 5 ? false : true}>
                <FaAngleLeft className='text-[21px] rotate-180' />        
            </Btns>
        </div>
    )
}

export default Pagination