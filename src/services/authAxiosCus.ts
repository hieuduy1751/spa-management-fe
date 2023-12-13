import axios from 'axios'
import api from '../constants/api'

const authAxiosInstanceCus = axios.create({
  baseURL: api.apiPath,
  headers: {
    'Content-Type': 'application/json'
  }
})

authAxiosInstanceCus.interceptors.request.use((config) => {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoaWV1ZHV5MTc1MSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwMTc1OTAyMywiZXhwIjoxNzEwMzk5MDIzfQ.6iIPvwVsrbeM1_2PeuETC0AQfT1CXnGwwxtpABGR7hA'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

authAxiosInstanceCus.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { response } = error

    return response
  }
)

authAxiosInstanceCus.defaults.withCredentials = true

export default authAxiosInstanceCus
