import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectMongo from './mongo.js'
import usersRouter from './controllers/users.js'
import notesRouter from './controllers/notes.js'
import accRouter from './controllers/acc.js'
import { PORT, WHITELISTED_DOMAINS } from './config.js'

connectMongo()

export const app = express()
app.use(cors(
  { origin: WHITELISTED_DOMAINS }
))
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', accRouter)
app.use((req, res) => res.status(404).send({ error: 'Not found' }))
app.use((error, req, res, next) => {
  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'Malformatted ID' })
    case 'ValidationError':
      return res.status(400).send({ error: error.message })
    case 'DuplicateError':
      return res.status(422).send({ error: error.message })
    default:
      return res.status(500).send({ error: error.message })
  }
})

export const server = app.listen(PORT, () => {
  console.log('Server running')
})
