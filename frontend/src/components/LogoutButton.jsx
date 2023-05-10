import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { LogoutIcon } from './Icons'

const LogoutButton = () => {
  const [isHover, setIsHover] = useState(false)
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    window.localStorage.removeItem('token')
    setAuth({})
    navigate('/')
  }

  return (
    <button
      className='flex gap-1 fixed top-5 right-5 z-40 fill-current text-black/50 hover:text-black/100 transition-all duration-300 z'
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className={`${isHover ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} transition-all duration-300`}>
        Cerrar sesion
      </span>
      <LogoutIcon />
    </button>
  )
}

export default LogoutButton
