import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from './RequireAuth'
import MainLayout from '../layouts/mainLayout'
import Logout from './Logout'
import AuthLayout from '../layouts/authLayout'

export default function AppRouter() {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={protectedLayout}></Route>
        <Route path='/auth' element={<AuthLayout />}></Route>
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}
