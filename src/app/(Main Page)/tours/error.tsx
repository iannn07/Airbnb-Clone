'use client'

function error({ error }: { error: Error }) {
  console.error(error)

  return <h1 className='text-6xl m-0 p-0'>There&apos;s samting wong</h1>
}

export default error
