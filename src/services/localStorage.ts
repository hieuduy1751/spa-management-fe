export const persistToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const persistUsername = (username: string): void => {
  localStorage.setItem('username', username)
}
export const persistRole = (role: string): void => {
  localStorage.setItem('role', role)
}

export const readToken = (): string => {
  return localStorage.getItem('token') || ''
}

export const readRole = (): string => {
  return localStorage.getItem('role') || ''
}

export const readUsername = (): string => {
  return localStorage.getItem('username') || ''
}

export const persistUser = (user: any): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const readUser = (): any | null => {
  const userStr = localStorage.getItem('user')

  return userStr ? JSON.parse(userStr) : null
}

export const deleteToken = (): void => localStorage.removeItem('token')
export const deleteUser = (): void => localStorage.removeItem('user')
