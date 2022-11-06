import React from 'react'
import Card from './Card'

const Index = () => {
  return (
    <div className='flex flex-col md:flex-row gap-4'>
        <Card img='/categories/club.webp' heading='National Kit' desc='Check out the kits of all your favoirite nations participating in World Cup.'/>
        <Card img='/categories/country.jpg' heading='Club Kit' desc='Choose from wide range of kits of your favourite clubs from most leagues.' />
    </div>
  )
}

export default Index