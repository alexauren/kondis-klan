import { NewProgram } from 'modules/newprogram/NewProgram'
import { NewProgramPage } from 'modules/newprogram/NewProgramPage'
import UserInfo from 'modules/user/views/ProfilePage'
import Progression from 'modules/user/views/Progression'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../containers/MainLayout'
import { LandingPage } from '../modules/landing/LandingPage'
import MainContent from './MainContent'

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="newprogram" element={<NewProgramPage />} />
        <Route path="profile/:userId" element={<UserInfo />} />
        <Route path="settings" element={<h1>Innstillinger</h1>} />
        <Route path="progression" element={<Progression />} />
      </Route>
      {/* TODO: Insert routes to e.g. profile and other pages*/}
    </Routes>
  )
}

export default PrivateRoutes
