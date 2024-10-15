import { createUser, fetchUser } from '@/utils/CreateUser'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('🚀 ~ GET ~ request:', request.url)
  console.log('🚀 ~ GET ~ request id:', request.nextUrl.searchParams.get('id'))

  const allUsers = await fetchUser()

  console.log('🚀 ~ GET ~ allUsers:', allUsers)

  return NextResponse.redirect(new URL('/', request.url))
}

export async function POST(request: NextRequest) {
  const newUser = await request.json()
  console.log('🚀 ~ POST ~ newUser:', newUser)

  const saveUser = await createUser(newUser)

  if (!saveUser)
    return NextResponse.json({
      success: false,
      message: 'Failed to create user',
    })

  const allUser = await fetchUser()
  console.log('🚀 ~ POST ~ allUser:', allUser)

  return NextResponse.json({
    success: true,
    message: 'User created successfully',
  })
}
