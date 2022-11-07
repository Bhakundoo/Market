import React from 'react'
import styled from 'styled-components'

const PBtn = styled.button`
  border-radius: 6px;
  background-color: ${props => props.inverted ? props.theme.body : props.theme.primary};
  padding: 0.75rem 1.5rem;
  color: ${props => props.inverted ? props.theme.primary : props.theme.body};
  width: fit-content;
  position: relative;
  overflow: hidden;

  // ripple effect on hover
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%; 
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: ${props => props.inverted ? props.theme.primary : props.theme.body};
    opacity: 0.3;
    transition: all 0.3s ease;
    filter: blur(4px);
  }

  &:hover::after {
    width: 200px;
    height: 200px;
  }

`
const Text = styled.p`
  font-size: 21px;
  font-weight: 400;
  color: ${props => props.theme.primary};
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.primary}50;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
    filter: blur(5px);
  }

  &:hover::before {
    opacity: 1;
    transform: scale(2.5);
  }
`
const IBtn = styled.button`
  border-radius: 4px;
  background-color: ${props => props.theme.primary};
  padding: 0.75rem 1.5rem;
  color: ${props => props.theme.body};
  width: fit-content;

  &:hover {
    background-color: ${props => props.theme.primary}75;
  }
`
const PrimaryButton = ({ text, additionalClass, inverted }) => {
  return (
    <PBtn className={`${additionalClass}`} inverted={inverted}>
        {text}
    </PBtn>
  )
}
const SecondaryButton = ({ text, additionalClass, onClick }) => {
  return (
    <button className={`bg-transparent py-4 w-fit border-none ${additionalClass}`} onClick={onClick}>
      <Text className='italic font-semibold underline underline-offset-2'>{text}</Text>
    </button>
  )
}
const IconButton = ({ icon, additionalClass, onClick }) => {
  return (
    <IBtn className={`${additionalClass}`} onClick={onClick}>
      {icon}
    </IBtn>
  )
}

export { PrimaryButton, SecondaryButton, IconButton }