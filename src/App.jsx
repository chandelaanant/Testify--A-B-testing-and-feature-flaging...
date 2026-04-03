import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './Pages/Landing'
import Auth from './Pages/Auth'
import RoleSelection from './Pages/RoleSelection'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}