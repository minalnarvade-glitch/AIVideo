"use client"
import React, { useState } from 'react'
import Image from 'next/image'

export const options = [
  {
    name: 'Cinematic',
    image: '/Cinematic.jpg'
  },
  {
    name: 'Anime',
    image: '/Anime.jpg'
  },
  {
    name: 'Realistic',
    image: '/Realistic.jpg'
  },
  {
    name: 'Cartoon',
    image: '/Cartoon.jpg'
  },
  {
    name: 'Cyberpunk',
    image: '/Cyberpunk.jpg'
  },
  {
    name: 'GTA',
    image: '/GTA.jpg'
  },
]

function VideoStyle({ onHandleInputChange }) {

  const [selectedStyle, setSelectedStyle] = useState(""); // ✅ FIX

  return (
    <div className='mt-5'>
      <h2>Video Styles</h2>
      <p className='text-sm text-gray-400'>Select video style</p>

      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2'>
        {options.map((option, index) => (   // ✅ FIX (return)
          <div
            key={index}
            className='relative'
            onClick={() => {
              setSelectedStyle(option.name);
              onHandleInputChange('videoStyle', option.name);
            }}
          >
            <Image
              src={option.image}
              alt={option.name}
              width={500}
              height={120}
              className={`object-cover h-[90px] lg:h-[130px] xl:h-[180px] rounded-lg p-1
              hover:border border-gray-300 cursor-pointer
              ${option.name === selectedStyle ? 'border-2 border-white' : ''}`}
            />

            <h2 className='absolute bottom-1 text-center w-full text-white'>
              {option.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoStyle