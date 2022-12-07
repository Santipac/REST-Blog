/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import jwt from 'jsonwebtoken'
import config from '../config'

interface IDecode {
  email: string
  id: string
}

export class TokenService {
  public static async generate(id: string, email: string): Promise<string> {
    try {
      const payload = { id, email }
      const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' })
      return token
    } catch (error) {
      console.log(error)
      return 'Could not generate the token.'
    }
  }

  public static async refresh(id: string, email: string): Promise<string> {
    try {
      const payload = { id, email }
      const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
        expiresIn: '1d',
      })
      return refreshToken
    } catch (error) {
      console.log(error)
      return 'Could not generate the refresh token.'
    }
  }

  public static async verify(token: string): Promise<IDecode> {
    const decoded = jwt.verify(token, config.JWT_SECRET) as IDecode
    return decoded
  }
}
