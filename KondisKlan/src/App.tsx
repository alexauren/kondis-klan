import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import './App.css'
import { firebaseConfig } from './firebase/firebaseConfig'
import { LandingPage } from './modules/landing/LandingPage'
import { ExerciseForm } from './modules/workoutsession/forms/ExerciseForm'
import { WorkoutSessionForm } from './modules/workoutsession/forms/WorkoutSessionForm'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);

function App() {

  return (
    <div className="App">
      <LandingPage />
      <WorkoutSessionForm/>
      <ExerciseForm/>
    </div>
  )
}

export default App
