import React from 'react'
import styled from 'styled-components'

const Loader = styled.div`
    width: 100%;
    height: 4.8px;
    display: inline-block;
    position: relative;
    background: rgba(255, 255, 255, 0.15);
    overflow: hidden;
    
    &::after {
        content: '';
        width: 192px;
        height: 4.8px;
        background: ${props => props.theme.primary};
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        animation: animloader 2s linear infinite;
    }

    @keyframes animloader {
        0% {
          left: 0;
          transform: translateX(-100%);
        }
        100% {
          left: 100%;
          transform: translateX(0%);
        }
    }
      
`

const Loading = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
        <Loader />
    </div>
  )
}

export default Loading