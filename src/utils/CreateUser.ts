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

export async function createUser(formData: userData) {
  const validation = validateForm(formData)

  if (validation) {
    console.log({ validation })
    return {}
  }

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

async function saveUser(user: userData) {
  const users = await fetchUser()
  users.push(user)
  await writeFile('users.json', JSON.stringify(users))
}
