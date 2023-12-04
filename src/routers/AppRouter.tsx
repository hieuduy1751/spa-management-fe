import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from './RequireAuth'
import MainLayout from '../layouts/mainLayout'
import Logout from './Logout'
import AuthLayout from '../layouts/authLayout'
import LandingPage from '~/pages/LandingPage'
import FullscreenLayout from '~/layouts/fullscreenLayout'
import SignUpPage from '~/pages/SignUpPage'
import SignInPage from '~/pages/SignInPage'
import AppointmentPage from '~/pages/AppointmentPage'
import ServicePage from '~/pages/ServicePage'
import UserInfoPage from '~/pages/UserInfoPage'
import TreatmentListPage from '~/pages/TreatmentListPage'
import AppointmentListPage from '~/pages/AppointmentListPage'
import InvoicePage from '~/pages/InvoicePage'
import ConfirmEmail from '~/pages/ConfirmEmail'
import ServiceDetailPage from '~/pages/ServiceDetailPage'

export default function AppRouter() {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<FullscreenLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='appointment' element={<AppointmentPage />} />
          <Route path='services' element={<ServicePage />} />
          <Route path='services/:id' element={<ServiceDetailPage />} />
        </Route>
        <Route path='/user' element={protectedLayout}>
          <Route path='info' element={<UserInfoPage />} />
          <Route path='treatments' element={<TreatmentListPage />} />
          <Route path='appointment' element={<AppointmentListPage />} />
          <Route path='invoice' element={<InvoicePage />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='signup' element={<SignUpPage />} />
          <Route path='confirm-email' element={<ConfirmEmail />} />
          <Route path='login' element={<SignInPage />} />
        </Route>
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}
