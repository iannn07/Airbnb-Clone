import { fetchTours } from '@/utils/ToursFetchData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function ToursPage() {
  const data = await fetchTours()

  if (!data) return null

  return (
    <div className='flex flex-col gap-10 items-start justify-center'>
      {data.map((tour, index) => (
        <ol key={index}>
          <li>
            <h1 className='text-xl font-bold'>Tour {index + 1} Details</h1>
            <div className='flex gap-2 justify-center items-center flex-col'>
              <p className='w-full flex flex-col font-semibold'>
                Tour ID:
                <Link
                  href={`/tours/${tour.id}`}
                  className='font-normal hover:underline hover:text-blue-500'
                >
                  {tour.id}
                </Link>
              </p>
              <p className='w-full flex flex-col font-semibold'>
                Tour Name:
                <span className='font-normal'>{tour.name}</span>
              </p>
              <p className='w-full flex flex-col font-semibold'>
                Tour Info:
                <span className='font-normal'>{tour.info}</span>
              </p>
              <p className='w-full flex flex-col font-semibold'>
                Tour Image:
                <Image
                  src={tour.image}
                  alt={tour.name}
                  width={192}
                  height={192}
                />
              </p>
              <p className='w-full flex flex-col font-semibold'>
                Tour Price:
                <span className='font-normal'>{tour.price}</span>
              </p>
            </div>
          </li>
        </ol>
      ))}
    </div>
  )
}

export default ToursPage
