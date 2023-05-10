import { useState } from 'react'
import { CreateIcon } from './Icons'

const OpenFormButton = ({ toggleModal }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <button
      className='flex gap-1 fixed top-14 right-5 z-40 fill-current text-black/50 hover:text-black/100 transition-all duration-300 z'
      onClick={toggleModal}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className={`${isHover ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} transition-all duration-300`}>
        Crear nota
      </span>
      <CreateIcon />
    </button>
  )
}

export default OpenFormButton
