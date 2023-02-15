import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase/firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { LandingPage } from './modules/landing/LandingPage'
import { ExampleForm } from './modules/workoutsession/forms/ExampleForm'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);

function App() {

  return (
    <div className="App">
      <LandingPage />
      <ExampleForm/>
    </div>
  );
}

export default App;
