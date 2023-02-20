import { Route, Routes } from 'react-router-dom'
import MainLayout from '../containers/MainLayout'
import { LandingPage } from '../modules/landing/LandingPage'
import { NewProgram } from '../modules/newprogram/NewProgram'
import MainContent from './MainContent'

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
      {/* TODO: Insert routes to e.g. profile and other pages*/}
      <Route path="/newprogram" element={<NewProgram />} />
    </Routes>
  )
}

export default PublicRoutes
