import jwt from 'jsonwebtoken'
import config from '../config'
export const generateJWT = async (
  id: string,
  email: string
): Promise<string> => {
  try {
    const payload = { id, email }
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' })
    return token
  } catch (error) {
    console.log(error)
    return 'Could not generate the token.'
  }
}
