import API from '../constants/api'
import authAxiosInstance from './authAxios'
import defaultAxiosInstance from './defaultAxios'

export async function login(username: string, password: string) {
  const path = `${API.apiPath}/${API.authentication.login}?username=${username}&password=${password}`
  const res = await defaultAxiosInstance.post(path)
  return res.data
}

export async function register(username: string, password: string, passwordConfirm: string, email: string) {
  const payload = {
    username,
    password,
    passwordConfirm
  }
  console.log(payload)
  const path = `${API.apiPath}/${API.authentication.register}?email=${email}`
  const res = await defaultAxiosInstance.post(path, payload)
  return res.data
}

export async function logout() {
  const path = `${API.apiPath}/${API.authentication.logout}`
  const res = await authAxiosInstance.post(path)
  return res.data
}
