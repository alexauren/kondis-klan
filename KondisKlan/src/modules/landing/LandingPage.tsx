import { Container } from '@mantine/core'
import { ExerciseForm } from 'modules/workoutsession/forms/ExerciseForm'
import { WorkoutSessionForm } from 'modules/workoutsession/forms/WorkoutSessionForm'
import { WorkoutSessionDetail } from 'modules/workoutsession/views/WorkoutSessionDetail'
import { useMobile } from 'util/hooks'

export function LandingPage() {
  const isMobile = useMobile()
  return (
    <Container p={isMobile ? 0 : 'sm'} size={'sm'}>
      <WorkoutSessionDetail />
      <WorkoutSessionForm />
      <ExerciseForm />
    </Container>
  )
}
