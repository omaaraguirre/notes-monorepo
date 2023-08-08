import Router from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import generarJWT from '../helpers/generarJWT.js'

const usersRouter = Router()

usersRouter.get('/', async (req, res, next) => {
  await User.find({}).populate('notes', { content: 1, date: 1 })
    .then(users => res.json(users))
    .catch(error => next(error))
})

usersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params
  User.findById(id)
    .then(user => {
      if (!user) {
        throw new Error('User not found')
      }
      res.json(user)
    })
    .catch(error => next(error))
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    const error = new Error('Username or password missing')
    error.name = 'ValidationError'
    return next(error)
  }

  const user = await User.findOne({ username })
  if (!user) {
    const error = new Error('User not found')
    error.name = 'ValidationError'
    return next(error)
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    const error = new Error('Invalid password')
    error.name = 'ValidationError'
    return next(error)
  }

  res.json({
    id: user._id,
    username: user.username,
    name: user.name,
    token: generarJWT(user)
  })
})

usersRouter.post('/register', async (req, res, next) => {
  const { name, username, password } = req.body

  if (!name || !username || !password) {
    const error = new Error('All fields are required')
    error.name = 'ValidationError'
    return next(error)
  }

  const user = await User.findOne({ username })
  if (user) {
    const error = new Error('Username already exists')
    error.name = 'DuplicateError'
    return next(error)
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
