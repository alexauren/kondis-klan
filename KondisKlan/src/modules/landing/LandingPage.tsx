import { collection, DocumentData } from 'firebase/firestore'
import { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from 'containers/Root'
import { WorkoutSessionDetail } from 'modules/workoutsession/views/WorkoutSessionDetail'
import { useWorkoutSessionCollection } from 'firebase/queries/workoutSessionQueries'
import { Container } from '@mantine/core'
import { useMobile } from 'util/hooks'
import { SignUp } from 'modules/authentication/SignupForm'
import SignupPage from 'modules/authentication/SignupPage'

export function LandingPage() {
  const isMobile = useMobile()
  return (
    <Container p={isMobile ? 0 : 'sm'} size={'sm'}>
      <WorkoutSessionDetail />
    </Container>
  )
}
