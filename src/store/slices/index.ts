import userReducer from './userSlice'
import authReducer from './authSlice'
import appointmentsSlice from './appointmentSlice'
import servicesSlice from './serviceSlice'
import treatmentsSlice from './treatmentSlice'
import invoicesSlice from './invoicesSlice'

export default {
  user: userReducer,
  auth: authReducer,
  appointments: appointmentsSlice,
  services: servicesSlice,
  treatments: treatmentsSlice,
  invoices: invoicesSlice
}
