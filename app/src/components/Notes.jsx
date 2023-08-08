import useNote from '../hooks/useNote'
import Note from './Note'

const Notes = () => {
  const { notes } = useNote()

  return (
    <>
      <h1 className='montserrat text-3xl text-center my-5'>Notas</h1>
      <section className='flex flex-col md:grid md:gap-x-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 w-full max-w-7xl mx-auto'>
        {
        notes.length > 0
          ? Object.keys(notes).map(key => <Note key={key} note={notes[key]} />)
          : <p className=''>No hay notas</p>
      }
      </section>
    </>
  )
}

export default Notes
