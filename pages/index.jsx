import Head from 'next/head'
import Image from 'next/image'
import Carousel from '../components/HomeComponents/Carousel'
import Card from '../components/HomeComponents/Categories/Card'
import Index from '../components/HomeComponents/Categories/Index'

import HeadSEO from '../layout/HeadSEO'

export default function Home() {
  return (
    <>
      <HeadSEO
        title='Bhakundoo Market'
        description='Buy the jerseys of the country you are supporting in the FIFA World Cup 2022 and of your favourite clubs.'
      />

      <maiin className='max-w-[1366px] flex-1 mx-auto flex flex-col gap-y-16'>
        <Carousel />
        <Index />
      </maiin>
    </>
  )
}
