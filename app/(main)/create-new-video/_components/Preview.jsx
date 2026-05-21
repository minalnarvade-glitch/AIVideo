"use client"
import Image from 'next/image'
import React from 'react'
import { options } from './VideoStyle' // ✅ IMPORT FIX

function Preview({ formData }) {

  const selectedVideoStyle = options?.find(
    (item) => item?.name === formData?.videoStyle
  );

  return (
    <div className="relative">
      <h2 className='mb-3 text-2xl'>Preview</h2>

      {selectedVideoStyle && (   // ✅ SAFE CHECK
        <Image
          src={selectedVideoStyle.image}
          alt={selectedVideoStyle.name}
          width={1000}
          height={300}
          className='w-full h-[70vh] object-cover rounded-xl'
        />
      )}

      {formData?.captions && (   // ✅ FIXED KEY
        <h2
          className={`absolute bottom-7 text-center w-full text-white text-xl`}
        >
          Sample Caption Preview
        </h2>
      )}
    </div>
  )
}

export default Preview