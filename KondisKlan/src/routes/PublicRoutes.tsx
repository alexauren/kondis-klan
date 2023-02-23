import LoginPage from 'modules/authentication/LoginPage'
import SignupPage from 'modules/authentication/SignupPage'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../modules/landing/LandingPage'
import MainContent from './MainContent'

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default PublicRoutes
