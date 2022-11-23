import jwt from 'jsonwebtoken'
import config from '../config'
export const generateJWT = async (
  id: string,
  email: string
): Promise<string> => {
  try {
    const payload = { id, email }
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '10s' })
    return token
  } catch (error) {
    console.log(error)
    return 'Could not generate the token.'
  }
}
export const generateRefreshJWT = async (
  id: string,
  email: string
): Promise<string> => {
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
