import { server } from '../index'
import mongoose from 'mongoose'
import Note from '../models/Note'
import { api, initialNotes, getAllContentFromNotes } from './helpers'
import User from '../models/User'
import bcrypt from 'bcrypt'

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'usertest', name: 'User test', passwordHash })
  const createdUser = await user.save()

  await Note.deleteMany({})
  for (const note of initialNotes) {
    const newNote = new Note({ ...note, user: createdUser.id })
    await newNote.save()
  }
})

describe('GET notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`there are at least ${initialNotes.length} notes`, async () => {
    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const { contents } = await getAllContentFromNotes()
    expect(contents).toContain(initialNotes[0].content)
  })
})

describe('POST notes', () => {
  test('a valid note can be added', async () => {
    const res = await User.findOne({ username: 'usertest' })
    const user = res.toJSON()

    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
      user: user.id
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { contents, response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
  })

  test('note without content can not be added', async () => {
    const newNote = {
      content: "This note doesn't have user",
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE notes', () => {
  test('a note can be deleted', async () => {
    const { response: firstResponse } = await getAllContentFromNotes()
    const { body: notes } = firstResponse
    const noteToDelete = notes[0]
    await api.delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const { contents, response: secondResponse } = await getAllContentFromNotes()
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)
  })

  test('a note that does not exist can not be deleted', async () => {
    await api.delete('/api/notes/123123')
      .expect(400)

    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
