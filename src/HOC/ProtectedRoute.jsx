import { Navigate } from 'react-router-dom'
import { UseCurrentUserContext } from '../context/CurrentUserContext'

export const ProtectedRoute = ({ element: Component, ...props }) => {
  const { isLoggedIn } = UseCurrentUserContext()

  return isLoggedIn ? <Component {...props} /> : <Navigate to='/' replace />
}
