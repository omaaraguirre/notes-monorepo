import { Xmark } from './Icons'

const Modal = ({ isVisible, toggleModal, children }) => {
  return (
    <>
      <div className={`${isVisible ? 'opacity-100 z-50' : 'opacity-0 z-0'} transition-all duration-300 fixed inset-0 grid place-items-center w-full h-screen bg-black/50 backdrop-blur-sm`}>
        <div className='relative w-11/12 max-w-2xl p-4 bg-white/80 backdrop-blur-lg rounded shadow-md shadow-black'>
          <button onClick={toggleModal} className='absolute top-5 right-5 h-4 w-4 fill-current text-black/50 hover:text-black transition-all duration-300'>
            <Xmark />
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
