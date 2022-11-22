import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../../redux/apiCalls'
import Card from './Card'

const Index = () => {
  const { category } = useSelector(state => state.category)
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch])

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      {
        category?.map((item, index) => (
          <Card
            key={index} 
            img={item.image} 
            heading={item.name} 
            slug={item.slug}
          />
        ))
      }
    </div>
  )
}

export default Index