import userReducer from './userSlice'
import authReducer from './authSlice'
import appointmentsSlice from './appointmentSlice'
import servicesSlice from './serviceSlice'

export default {
  user: userReducer,
  auth: authReducer,
  appointments: appointmentsSlice,
  services: servicesSlice
}
