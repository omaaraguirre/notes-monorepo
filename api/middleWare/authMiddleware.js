import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { JWT_SECRET } from '../config.js'

const checkAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
      const error = new Error('Authorization header is missing')
      error.name = 'ValidationError'
      throw error
    }

    const [, token] = authorization.split(' ')
    const decodedToken = jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        const error = new Error(err.name)
        error.name = 'ValidationError'
        throw error
      }
      return decoded
    })
    const user = await User.findById(decodedToken.id)

    if (!user) {
      const error = new Error('Authorization failed')
      error.name = 'ValidationError'
      throw error
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export default checkAuth
