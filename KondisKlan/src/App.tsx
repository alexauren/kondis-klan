import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase/firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { LandingPage } from './modules/landing/LandingPage'
import { ExampleForm } from './modules/workoutsession/forms/ExampleForm'
import { ExerciseCard } from './modules/workoutsession/exercisecard/ExerciseCard'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);

function App() {

  return (
    <div className="App">
      <LandingPage />
      <ExampleForm/>
      <ExerciseCard
        image={reactLogo}
        title="React"
        description="A JavaScript library for building user interfaces"
        stats={[
          { title: 'Stars', value: '56k' },
          { title: 'Forks', value: '6.9k' },
          { title: 'Issues', value: '3' },
        ]}/>
    </div>
  )
}

export default App
