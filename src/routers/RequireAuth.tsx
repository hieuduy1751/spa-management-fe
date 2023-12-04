import React from 'react'
import { Navigate } from 'react-router-dom'
import { WithChildrenProps } from '../types/generalTypes'
import { useAppSelector } from '../hooks/reduxHooks'

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token)
  const role = useAppSelector((state) => state.auth.role)
  const username = useAppSelector((state) => state.auth.username)

  return token && role === 'CUSTOMER' && username ? <>{children}</> : <Navigate to='/auth/login' replace />
}

export default RequireAuth
