import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import Card from './Card'
import Pagination from './Pagination'

import { getProducts } from '../../../redux/apiCalls'
import axios from 'axios'

const SkeletonBox = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: #aeaeae35;
  border-radius: 4px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
    transform: translateX(-60%);
    animation: shimmer 1s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`

const Products = () => {
  const { isFetching, products } = useSelector(state => state.products)
  const [currentPage, setCurrentPage] = useState(1)
  console.log(products)

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch])

  const handleClickPage = (e) => {
    setCurrentPage(Number(e.target.textContent))
  }
  const handlePrev = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNext = () => {
    if(currentPage !== 5) {
      setCurrentPage(currentPage + 1)
    }
  }

  if(isFetching) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {
          [0, 1, 2, 3, 4].map((index) => (
            <SkeletonBox key={index} className='w-full md:w-56 h-72 flex flex-col gap-4'>

            </SkeletonBox>
          ))
        }
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-16 items-center'>
      <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-4'>
        {
          products?.map((product, index) => (
            <Card 
              key={index}
              img={product.gallery[0].image} 
              name={product.name}
              price={product.price} 
              link={product.slug} 
            />
          ))
        }
      </div>
      
      {/* {
        products?.length > 10 && 
        <Pagination 
          page={currentPage} 
          handleClickPage={handleClickPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      } */}

    </div>
  )
}

export default Products