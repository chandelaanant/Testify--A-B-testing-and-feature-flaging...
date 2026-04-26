import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicRoute({ children }) {
    const { user } = useAuth()

    if (user && user.role) return <Navigate to="/dashboard" replace />
    if (user && !user.role) return <Navigate to="/role-selection" replace />

    return children
}