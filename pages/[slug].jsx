import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Card from '../components/HomeComponents/ProductComponent/Card'

import HeadSeo from '../layout/HeadSEO'

const Title = styled.div`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.primary}50;
`

const ProductsByCategories = () => {
  const { isFetching, productByCategory } = useSelector(state => state.products)

  return (
    <>
        <HeadSeo
            title='Bhakundoo Market'
            description='Buy the jerseys of the country you are supporting in the FIFA World Cup 2022 and of your favourite clubs.'
        />

        <main className='max-w-[1366px] flex-1 mx-auto flex flex-col items-center gap-y-16'>
            <Title className='w-full pb-4'>
                <h1 className='text-center'>{productByCategory?.category.name}</h1>
            </Title>

            <div className='flex gap-x-12 gap-y-4 flex-wrap justify-center'>
                {
                    productByCategory?.products.map((product, index) => (
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
        </main>
    </>
  )
}

export default ProductsByCategories