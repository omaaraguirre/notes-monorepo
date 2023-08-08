import { createContext, useEffect, useState } from 'react'
import showToast from '../utils/toast'
import { BACKEND_URL } from '../utils/cfg'

export const NotesContext = createContext()

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const token = window.localStorage.getItem('token')

    fetch(`${BACKEND_URL}/api/notes`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error)
        }
        setNotes(data)
      })
      .catch(error => {
        console.error(error.message)
        showToast('Error al obtener las notas')
        setNotes([])
      })
  }, [])

  const updateNotes = (note) => {
    setNotes(prevState => (
      [...prevState, note]
    ))
  }

  const deleteNote = (id) => {
    const token = window.localStorage.getItem('token')
    fetch(`${BACKEND_URL}/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        setNotes(prevState => (
          prevState.filter(note => note.id !== id)
        ))
        showToast('Nota eliminada', 'success')
      })
      .catch(error => {
        console.error(error.message)
        showToast('Error al eliminar la nota')
      })
  }

  return (
    <NotesContext.Provider value={{
      notes, updateNotes, deleteNote
    }}
    >
      {children}
    </NotesContext.Provider>
  )
}
