import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const OutsideRoute = () => {
  const { auth, loading } = useAuth()

  return (
    <>
      {!loading && (auth?.id ? <Navigate to='/notes' /> : <Outlet />)}
    </>
  )
}

export default OutsideRoute
