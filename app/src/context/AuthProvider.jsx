import { createContext, useEffect, useState } from 'react'
import showToast from '../utils/toast'
import { BACKEND_URL } from '../utils/cfg'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState({})

  useEffect(() => {
    const autenticar = async () => {
      const token = window.localStorage.getItem('token')
      if (!token) {
        return setLoading(false)
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/`, config)
        const data = await res.json()
        setAuth(data)
      } catch (error) {
        showToast(error.message)
      }
      setLoading(false)
    }
    autenticar()
  }, [])

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      loading
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
