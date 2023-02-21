import { WorkoutSessionForm } from 'modules/workoutsession/forms/WorkoutSessionForm'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../modules/landing/LandingPage'
import MainContent from './MainContent'

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/new-workout" element={<WorkoutSessionForm />} />
      </Route>
      {/* TODO: Insert routes to e.g. profile and other pages*/}
    </Routes>
  )
}

export default PublicRoutes
