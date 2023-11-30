import User from '../models/User'
import bcrypt from 'bcrypt'
import { api, getUsers } from './helpers'
import { server } from '../index'
import mongoose from 'mongoose'

describe('creating a new user', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'usertest', name: 'User test', passwordHash })
    await user.save()
  })

  test('works as expected creating a new user', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'omaaraguirre',
      name: 'Omar Aguirre 1',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails if required field empty', async () => {
    const usersAtStart = await getUsers()
    const newUser = {
      username: 'userWithoutName',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if username is already taken', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'omaaraguirre',
      name: 'Omar Aguirre',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toMatch(/.* expected .* to be unique/)

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(async () => {
    mongoose.connection.close()
    server.close()
  })
})
