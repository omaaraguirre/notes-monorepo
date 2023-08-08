import { useContext } from 'react'
import { NotesContext } from '../context/NotesProvider'

const useNote = () => {
  const context = useContext(NotesContext)

  if (!context) {
    throw new Error('useNotes debe estar dentro del proveedor NotesContext')
  }

  return context
}

export default useNote
