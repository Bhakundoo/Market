import Head from 'next/head'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import Carousel from '../components/HomeComponents/Carousel'
import Index from '../components/HomeComponents/Categories/Index'
import Products from '../components/HomeComponents/ProductComponent/Products'
import Loading from '../components/Loading'
import Footer from '../layout/Footer'

import HeadSEO from '../layout/HeadSEO'

export default function Home() {
  return (
    <>
      <HeadSEO
        title='Bhakundoo Market'
        description='Buy the jerseys of the country you are supporting in the FIFA World Cup 2022 and of your favourite clubs.'
      />

      <main className='max-w-[1366px] flex-1 mx-auto flex flex-col gap-y-16'>
        <Carousel />
        <Index />
        <Products />
        <Footer />    
      </main>
    </>
  )
}
