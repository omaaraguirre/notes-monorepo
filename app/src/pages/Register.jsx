import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import showToast from '../utils/toast'
import { BACKEND_URL } from '../utils/cfg'

const Login = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const navigator = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !name || !password || !password2) {
      return showToast('Todos los campos son obligatorios')
    }

    if (password !== password2) {
      return showToast('Las contraseñas no coinciden')
    }

    fetch(`${BACKEND_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, name, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error)
        }
        // User registered successfully
        navigator('/')
      })
      .catch(err => {
        showToast(err.message || 'Error al registrar')
      })
  }

  return (
    <div className='ubuntu w-11/12 max-w-xl rounded-sm p-5 bg-white/10 backdrop-blur-xl shadow-md shadow-black/50'>
      <h2 className='montserrat text-3xl mb-3 text-center'>Register</h2>
      <form
        className='flex flex-col gap-3 items-center'
        onSubmit={handleSubmit}
      >
        <label className='flex flex-col gap-1 w-full'>
          Name
          <input
            type='text'
            className='p-2 bg-white/80 backdrop-blur-xl rounded-md focus:outline-none focus:ring-2 focus:ring-black/20'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className='flex flex-col gap-1 w-full'>
          Username
          <input
            type='text'
            className='p-2 bg-white/80 backdrop-blur-xl rounded-md focus:outline-none focus:ring-2 focus:ring-black/20'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className='flex flex-col gap-1 w-full'>
          Password
          <input
            type='password'
            className='p-2 bg-white/80 backdrop-blur-xl rounded-md focus:outline-none focus:ring-2 focus:ring-black/20'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className='flex flex-col gap-1 w-full'>
          Repeat Password
          <input
            type='password'
            className='p-2 bg-white/80 backdrop-blur-xl rounded-md focus:outline-none focus:ring-2 focus:ring-black/20'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
        <button className='mt-3 py-2 px-5 rounded-sm text-white bg-black/60 hover:bg-black transition-color duration-300'>
          Register
        </button>
      </form>
      <div className='text-center mt-5'>
        <Link to='/'>
          Already have an account?
          <span className='ml-1 border-b border-black'>Log in!</span>
        </Link>
      </div>
    </div>
  )
}

export default Login
