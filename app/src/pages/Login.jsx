import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import showToast from '../utils/toast'
import useAuth from '../hooks/useAuth'
import { BACKEND_URL } from '../utils/cfg'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuth } = useAuth()
  const navigator = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      return showToast('Todos los campos son obligatorios')
    }

    fetch(`${BACKEND_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error)
        }
        window.localStorage.setItem('token', data.token)
        setAuth(data)
        // User logged in successfully
        navigator('/notes')
      })
      .catch(err => showToast(err.message || 'Error al iniciar sesión'))
  }

  return (
    <div className='ubuntu w-11/12 max-w-xl rounded-sm p-5 bg-white/10 backdrop-blur-xl shadow-md shadow-black/50'>
      <h2 className='montserrat text-3xl mb-3 text-center'>Login</h2>
      <form
        className='flex flex-col gap-3 items-center'
        onSubmit={handleSubmit}
      >
        <label className='flex flex-col gap-1 w-full'>
          Username
          <input
            type='text'
            value={username}
            className='p-2 bg-white/80 backdrop-blur-xl rounded-md focus:outline-none focus:ring-2 focus:ring-black/20'
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </label>
        <label className='flex flex-col gap-1 w-full'>
          Password
          <input
            type='password'
            value={password}
            className='p-2 bg-white/80 backdrop-blur-xl rounded-md focus:outline-none focus:ring-2 focus:ring-black/20'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className='mt-3 py-2 px-5 rounded-sm text-white bg-black/60 hover:bg-black transition-color duration-300'>
          Login
        </button>
      </form>
      <div className='text-center mt-5'>
        <Link to='/register'>
          Don't have an account?
          <span className='ml-1 border-b border-black'>Create one!</span>
        </Link>
      </div>
    </div>
  )
}

export default Login
