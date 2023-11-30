import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

const generarJWT = id => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' })
}

export default generarJWT
