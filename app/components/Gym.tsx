import React from 'react'
import Image from 'next/image'

export default function Gym() {
  return (
    <section className='w-full mx-auto'>
        <Image
        src="/images/Gym.jpeg"
        width={200}
        height={200}
        alt='Tapish'
        priority={true}
        />
    </section>
  )
}

