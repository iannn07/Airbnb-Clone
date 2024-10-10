import React from 'react'

interface TourDetailsPageProps {
  params: {
    tourId: string
  }
}

function TourDetailsPage({ params }: TourDetailsPageProps) {
  return (
    <div className='flex w-full items-center justify-center'>
      {params.tourId}
    </div>
  )
}

export default TourDetailsPage
