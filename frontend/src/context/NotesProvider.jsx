import { createContext, useEffect, useState } from 'react'
import showToast from '../utils/toast'

export const NotesContext = createContext()

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const token = window.localStorage.getItem('token')

    fetch('/api/notes', {
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
    // TODO: Delete note from database
    const token = window.localStorage.getItem('token')
    fetch(`/api/notes/${id}`, {
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
