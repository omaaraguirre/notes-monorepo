import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LogoutButton from '../components/LogoutButton'
import { NotesProvider } from '../context/NotesProvider'

const ProtectedRoute = () => {
  const { auth, loading } = useAuth()

  return (
    <>
      {
        !loading &&
        (
          auth?.id
            ? (
              <>
                <NotesProvider>
                  <LogoutButton />
                  <Outlet />
                </NotesProvider>
              </>
              )
            : <Navigate to='/' />
        )
      }
    </>
  )
}

export default ProtectedRoute
