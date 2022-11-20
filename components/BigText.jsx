import React from 'react'
import styled from 'styled-components'

const HeadingText = styled.h1`
  width: 100%;
  font-size: 7rem;
  letter-spacing: 3rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  opacity: 0.3;

  @media (max-width: 768px) {
    font-size: 5rem;
    letter-spacing: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    letter-spacing: 1.25rem;
  }
`
const BigText = ({ text, additionalClass }) => {
  return (
    <HeadingText className={`${additionalClass} truncate`}>{text}</HeadingText>
  )
}

export default BigText