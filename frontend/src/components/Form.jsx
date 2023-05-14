import useNote from '../hooks/useNote'
import { useState } from 'react'
import showToast from '../utils/toast'
import { BACKEND_URL } from '../utils/cfg'

const Form = ({ onFinish }) => {
  const { updateNotes } = useNote()
  const [content, setContent] = useState('')
  const [important, setImportant] = useState(false)

  const handleTextArea = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) {
      return showToast('La nota no puede estar vacía')
    }

    const note = { content, important }

    const token = window.localStorage.getItem('token')

    fetch(`${BACKEND_URL}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })
      .then(res => res.json())
      .then(note => {
        if (note.error) {
          throw new Error(note.error)
        }
        setContent('')
        setImportant(false)
        updateNotes(note)
        onFinish()
        showToast('Nota agregada', 'success')
      })
      .catch(err => {
        showToast(err.message || 'Error al agregar la nota')
      })
  }

  return (
    <>
      <h3 className='montserrat text-3xl text-center my-5'>Agregar Nota</h3>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 w-full max-w-xl mx-auto'
      >
        <textarea
          className='h-16 p-2 bg-white/80 backdrop-blur-xl resize-none rounded-md  transition-color duration-300 focus:outline-none'
          placeholder='Escribe una nota...'
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleTextArea}
          value={content}
        />
        <div className='flex justify-between px-2'>
          <label className='flex items-center cursor-pointer select-none'>
            <input
              type='checkbox'
              className='h-5 w-5 mr-2 cursor-pointer'
              checked={important}
              onChange={() => setImportant(!important)}
            />
            Important
          </label>
          <button className='px-5 py-2 rounded-sm text-white bg-black/60 hover:bg-black transition-color duration-300'>
            Agregar
          </button>
        </div>
      </form>
    </>
  )
}

export default Form
