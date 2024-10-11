import Counter from '@/components/Counter'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <>
      <h1 className='text-7xl font-bold'>HomePage</h1>
      <div className='flex items-center justify-center gap-10 flex-col mt-40'>
        <div className='p-4 border border-white rounded-md'>
          <h1 className='text-4xl'>Counter</h1>
          <Counter />
        </div>

        <Link href='/tours' className='text-blue-500 hover:underline text-4xl'>
          Tours
        </Link>

        <Link
          href='/create-user'
          className='text-blue-500 hover:underline text-4xl'
        >
          Create User
        </Link>
      </div>
    </>
  )
}
