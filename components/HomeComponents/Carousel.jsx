/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { FaAngleLeft } from 'react-icons/fa'

import { getFeaturedProducts } from '../../redux/apiCalls'
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
  const { isFetching, featured } = useSelector(state => state.featured)

  const dispatch = useDispatch();

  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if(direction === "left"){
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    }
    else{
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  };

  useEffect(() => {
    getFeaturedProducts(dispatch);
  }, [dispatch])

  return (
    <div className={`w-full flex flex-col py-4 relative overflow-hidden`}>
      <SlideWrapper slideIndex={slideIndex}>
        {
          featured.map((item, index) => (
            <Featured
              key={index}
              text={(item.name).split(' ')[0]}
              name={item.name}
              category_title={item.category.name}
              img={item.gallery[0].image}
              link={item.slug}
            />
          ))
        }
      </SlideWrapper>

      <div className='lg:absolute bottom-12 right-0 flex gap-x-4'>
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