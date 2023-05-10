import Router from 'express'
import Note from '../models/Note.js'
import checkAuth from '../middleWare/authMiddleware.js'
import User from '../models/User.js'

const notesRouter = Router()

notesRouter.get('/', checkAuth, async (req, res, next) => {
  const user = await User.findById(req.user.id)

  try {
    const notes = await Note.find({ user: user._id }).populate('user', { username: 1, name: 1 })
    return res.json(notes)
  } catch (error) {
    next(error)
  }
})

notesRouter.get('/:id', checkAuth, (req, res, next) => {
  const { id } = req.params
  Note.findById(id).populate('user', { username: 1, name: 1 })
    .then(nota => {
      if (!nota) {
        throw new Error('ID not found')
      }
      res.json(nota)
    })
    .catch(error => next(error))
})

notesRouter.post('/', checkAuth, async (req, res, next) => {
  const user = await User.findById(req.user.id)
  const note = req.body
  if (!note || !note.content) {
    const error = new Error('Required content missing')
    error.name = 'ValidationError'
    next(error)
  }

  const newNote = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
    user: user._id
  })

  try {
    const nota = await newNote.save()
    if (!nota) {
      throw new Error('Error saving note')
    }

    user.notes.push(nota._id)
    await user.save()
    res.status(201).json(nota)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', checkAuth, (req, res, next) => {
  const { id } = req.params
  const note = req.body

  const newNote = {
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  Note.findByIdAndUpdate(id, newNote, { new: true })
    .then(result => {
      if (!result) {
        throw new Error('ID not found')
      }
      res.json(result)
    }).catch(error => {
      next(error)
    })
})

notesRouter.delete('/:id', checkAuth, async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await Note.deleteOne({ _id: id })
    if (result.deletedCount === 0) {
      throw new Error('ID not found')
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default notesRouter
