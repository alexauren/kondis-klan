import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase/firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { LandingPage } from './modules/landing/LandingPage'
import { ExampleForm } from './modules/workoutsession/forms/ExampleForm'
import { WorkoutCard } from './modules/workoutsession/workoutcard/WorkoutCard'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);

function App() {

  return (
    <div className="App">
      <LandingPage />
      <ExampleForm/>
      <WorkoutCard 
        //use image url from firebase
        image={"https://www.gymgrossisten.no/on/demandware.static/-/Sites-Gymgrossisten-Library/default/dwfe1a19d3/page_designer_articles/slik-blir-du-bedre-i-benkpress2.jpg"}
        title="Benkpress" 
        description="Benkpress er en øvelse som trener bryst, skuldre og triceps." 
        stats={[
          { title: 'Sets', value: '3' },
          { title: 'Reps', value: '5' },
          { title: 'Vekt', value: '100kg' },

        ]}
      />
    </div>
  )
}

export default App
