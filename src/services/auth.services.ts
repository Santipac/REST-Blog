import { compare, hash } from 'bcrypt'
import { UserService } from './users.services'
import { TokenService } from './jwt.services'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public static async register(name: string, email: string, password: string) {
    try {
      const isDuplicated = await UserService.getByEmail(email)

      if (isDuplicated !== null) {
        return { success: false, user: null, message: 'Email already in use.' }
      }
      const encrypted = await hash(password, 10)
      const { success, user } = await UserService.create({
        email,
        password: encrypted,
        name,
      })
      return { success, user, message: 'User registered succesfully!' }
    } catch (error) {
      console.log(error)
      return { success: false, user: null, message: 'Could not register user.' }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public static async login(email: string, password: string) {
    const data = await UserService.getByEmail(email)
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
    const token = await TokenService.generate(data.id, data.email)

    return {
      success: true,
      message: 'User authenticated successfully!',
      token,
      user: data,
    }
  }
}
