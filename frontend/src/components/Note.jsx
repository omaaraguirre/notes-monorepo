import { ImportantIcon, Xmark } from './Icons'
import useNote from '../hooks/useNote'

const Note = ({ note }) => {
  const { content, date, important } = note
  const { deleteNote } = useNote()

  const fecha = new Date(date)
  const hora = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Chicago' }).toUpperCase()

  return (
    <div className='roboto p-2 bg-white/30 backdrop-blur-xl hover:bg-white/50'>
      <header className='flex gap-2'>
        <div className='flex-1'>
          {
            important &&
              <span className='flex gap-1 items-center text-red-800 fill-current text-xs'>
                <ImportantIcon /> Important
              </span>
          }
        </div>
        <p className='text-gray-500 text-xs '>
          {hora} <span className='ml-1'>{fecha.toLocaleDateString()}</span>
        </p>
        <button
          className='w-4 h-4 fill-current text-gray-400'
          onClick={() => deleteNote(note.id)}
        >
          <Xmark />
        </button>
      </header>
      <p className='roboto mt-2'>{content}</p>
    </div>
  )
}

export default Note
