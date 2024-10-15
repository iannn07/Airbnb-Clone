'use server'

import { Sha256 } from '@aws-crypto/sha256-js'
import { readFile, writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { uuidv7 } from 'uuidv7'

interface userData {
  id?: string
  name: string
  email: string
  password: string
}

/**
 * ! HELPER FUNCTIONS
 * @param fields
 * @returns
 */
function validateForm(fields: Record<string, any>) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      return {
        name: `${key} is required`,
        message: 'Form is empty',
      }
    }
  }
  return null
}

async function hashPassword(password: string): Promise<string> {
  const sha256 = new Sha256()
  sha256.update(password)
  const digest = await sha256.digest()

  return Array.from(digest)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * ! EXPORTED FUNCTIONS
 * @param user
 * @returns
 */
export async function saveUser(user: userData) {
  const users = await fetchUser()
  users.push(user)
  await writeFile('users.json', JSON.stringify(users))
}

export async function createUser(formData: userData) {
  const validation = validateForm(formData)

  if (validation) {
    console.log({ validation })
    return {}
  }

  await new Promise((resolve) => setTimeout(resolve, 1500))
  const { name, email, password } = formData

  const encryptedPassword = await hashPassword(password)

  const newUser: userData = {
    id: uuidv7().toString(),
    name,
    email,
    password: encryptedPassword as string,
  }

  await saveUser(newUser)

  revalidatePath('/create-user')

  return newUser
}

export async function fetchUser(): Promise<userData[]> {
  const response = await readFile('users.json', 'utf-8')

  if (!response) return []

  return JSON.parse(response)
}

export async function deleteUser(formData: FormData) {
  const id = formData.get('id') as string
  const users = await fetchUser()
  const updatedUsers = users.filter((user) => user.id !== id)
  await writeFile('users.json', JSON.stringify(updatedUsers))
  revalidatePath('/create-user')
}

export async function deleteBindUser(id: string, formData: FormData) {
  const name = formData.get('name') as string
  console.log({ name, id })

  const users = await fetchUser()
  const updatedUsers = users.filter((user) => user.id !== id)
  await writeFile('users.json', JSON.stringify(updatedUsers))
  revalidatePath('/create-user')
}
