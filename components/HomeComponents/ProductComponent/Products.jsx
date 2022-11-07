import React, { useState } from 'react'
import { products } from '../../../data/products'

import Card from './Card'
import Pagination from './Pagination'

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1)

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

  return (
    <div className='flex flex-col gap-y-16 items-center'>
      <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-4'>
        {
          products.map((product, index) => (
            <Card 
              key={index}
              img={product.img} 
              name={product.name}
              price={product.price} 
              link={product.name} 
            />
          ))
        }
      </div>
        
      <Pagination 
        page={currentPage} 
        handleClickPage={handleClickPage}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

    </div>
  )
}

export default Products