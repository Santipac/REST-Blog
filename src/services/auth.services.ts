import { compare, hash } from 'bcrypt'
import { create, getByEmail } from './users.services'
import { User } from '@prisma/client'
import { generateJWT } from '../helpers/jwt'

type AuthenticateService = Promise<
  | {
      success: boolean
      user: null
      message: string
      token?: undefined
    }
  | {
      success: boolean
      message: string
      token: string
      user: User
    }
>

type RegisterService = Promise<{
  success: boolean
  user: User | null
  message: string
}>

export const register = async (
  name: string,
  email: string,
  password: string
): RegisterService => {
  try {
    const isDuplicated = await getByEmail(email)

    if (isDuplicated !== null) {
      return { success: false, user: null, message: 'Email already in use.' }
    }
    const encrypted = await hash(password, 10)
    const { success, user } = await create({ email, password: encrypted, name })
    return { success, user, message: 'User registered succesfully!' }
  } catch (error) {
    console.log(error)
    return { success: false, user: null, message: 'Could not register user.' }
  }
}

export const authenticate = async (
  email: string,
  password: string
): AuthenticateService => {
  const data = await getByEmail(email)
  if (data === null) {
    return {
      success: false,
      user: null,
      message: 'Could not found any user relationed with this email.',
    }
  }
  const isValid = await compare(password, data.password)
  if (!isValid) {
    return {
      success: false,
      user: null,
      message: 'Password is incorrect. Please try again.',
    }
  }
  const token = await generateJWT(data.id, data.email)

  return {
    success: true,
    message: 'User authenticated successfully!',
    token,
    user: data,
  }
}
