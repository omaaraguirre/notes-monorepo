import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
    const error = new Error('Authorization header is missing')
    error.name = 'ValidationError'
    return next(error)
  }

  const [, token] = authorization.split(' ')
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(decodedToken.id.id)

  if (!user) {
    const error = new Error('Authorization failed')
    error.name = 'ValidationError'
    return next(error)
  }

  req.user = user

  next()
}

export default checkAuth
