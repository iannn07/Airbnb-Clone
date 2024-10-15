'use client'

import { createUser } from '@/utils/CreateUser'
import { useFormStatus } from 'react-dom'

interface userData {
  name: string
  email: string
  password: string
}

function validateForm(formData: FormData) {
  if (formData.getAll.length === 0) {
    alert('Form is empty')
    return false
  }
  if (!formData.get('name')) {
    alert('Name is required')
    return false
  }
  if (!formData.get('email')) {
    alert('Email is required')
    return false
  }
  if (!formData.get('password')) {
    alert('Password is required')
    return false
  }
  return true
}

async function submitForm(formData: FormData) {
  if (!validateForm(formData)) alert('Haiya no valid la')

  const userData: userData = {
    name: formData.get('name')!.toString(),
    email: formData.get('email')!.toString(),
    password: formData.get('password')!.toString(),
  }

  const response = await createUser(userData)

  if (!response) {
    alert('Failed to create user')
    return
  }

  alert(`User created successfully \n ${JSON.stringify(response)}`)
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='mt-5 px-3 py-2 rounded bg-blue-500'
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create'}
    </button>
  )
}

function Form() {
  return (
    <form action={submitForm} className='mb-10'>
      <h1 className='text-4xl mb-5'>Create User</h1>

      <div className='flex gap-5'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name'>Name</label>
          <label htmlFor='email'>Email</label>
          <label htmlFor='password'>Password</label>
        </div>
        <div className='flex flex-col gap-2'>
          <input
            type='text'
            name='name'
            id='name'
            defaultValue='name'
            className='rounded-md border-white border bg-transparent px-3'
          />
          <input
            type='text'
            name='email'
            id='email'
            defaultValue='email'
            className='rounded-md border-white border bg-transparent px-3'
          />
          <input
            type='password'
            name='password'
            id='password'
            defaultValue='password'
            className='rounded-md border-white border bg-transparent px-3'
          />
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}

export default Form
