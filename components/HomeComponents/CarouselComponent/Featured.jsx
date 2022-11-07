/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'

import BigText from '../../BigText'
import { SecondaryButton } from '../../Buttons'

const Featured = ({ text, category_title, name, img, link }) => {
  const router = useRouter();
  return (
      <div className='w-full flex-shrink-0 h-[70vh] lg:h-[600px] relative flex flex-col justify-between py-4'>
        <BigText text={text} additionalClass='text-center' />
    
        <img src={img} alt={text + ' jersey buy in nepal'} className='w-auto h-1/2 lg:h-2/3 absolute top-1/3 lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 z-10' />

        <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
                <p className='italic opacity-60'>{category_title}</p>
                <h1>{name}</h1>
                <SecondaryButton text='Shop Now' onClick={() => router.push(`/product/${link}`)}/>
            </div>
        </div>

      </div>
  )
}

export default Featured