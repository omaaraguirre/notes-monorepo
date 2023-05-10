import supertest from 'supertest'
import { app } from '../index'
import User from '../models/User'

export const api = supertest(app)

export const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    date: new Date()
  },
  {
    content: 'Browser can execute only Javascript',
    important: true,
    date: new Date()
  }
]

export const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(r => r.content),
    response
  }
}

export const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON()) // toJSON para transformar al schema del modelo
}
