import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectMongo from './mongo.js'
import usersRouter from './controllers/users.js'
import notesRouter from './controllers/notes.js'
import accRouter from './controllers/acc.js'
import path from 'path'

dotenv.config()
const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI
connectMongo(connectionString, NODE_ENV)

const app = express()
app.use(cors())
app.use(express.json()) // middleware for parsing application/json

app.use(express.static('../frontend/dist'))

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', accRouter)

app.use((req, res) => res.sendFile(path.resolve('../frontend/dist/index.html')))

app.use((error, req, res, next) => { // middleware for handling errors
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

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

export { app, server }
