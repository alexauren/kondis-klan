import { Container } from '@mantine/core'
import { WorkoutSessionDetail } from 'modules/workoutsession/views/WorkoutSessionDetail'
import { useMobile } from 'util/hooks'

export function LandingPage() {
  const isMobile = useMobile()
  return (
    <Container p={isMobile ? 0 : 'sm'} size={'sm'}>
      <WorkoutSessionDetail />
    </Container>
  )
}
