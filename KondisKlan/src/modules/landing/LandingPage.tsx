import { Container } from '@mantine/core'
import { WorkoutSessionDetail } from 'modules/workoutsession/views/WorkoutSessionDetail'
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
