/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

import { FaAngleLeft } from 'react-icons/fa'
import styled from 'styled-components'

import { featuredProducts } from '../../data/featuredProducts'
import { IconButton } from '../Buttons'
import Featured from './CarouselComponent/Featured'

const SlideWrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${props => props.slideIndex * -100}%);
  width: 100%;
  transition: all 1.5s ease;
`

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if(direction === "left"){
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    }
    else{
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  };

  return (
    <div className='w-full h-[80vh] lg:h-[750px] flex flex-col py-4 relative overflow-hidden'>
      <SlideWrapper slideIndex={slideIndex}>
        {
          featuredProducts.map((item, index) => (
            <Featured
              key={index}
              text={(item.name).split(' ')[0]}
              name={item.name}
              category_title={item.category}
              img={item.img}
            />
          ))
        }
      </SlideWrapper>

      <div className='lg:absolute bottom-0 right-0 flex gap-x-4'>
        <IconButton
          icon={<FaAngleLeft className='text-[21px]' />}
          onClick={() => handleClick('left')}
        />
        <IconButton
          icon={<FaAngleLeft className='text-[21px] rotate-180' />}
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Carousel