import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './layout/ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'
import OutsideRoute from './layout/OutsideRoute'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path='/' element={<OutsideRoute />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/notes' element={<ProtectedRoute />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
