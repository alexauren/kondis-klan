import { Stack, Title } from '@mantine/core'
import { WorkoutSessionFeed } from 'modules/workoutsession/components/WorkoutSessionFeed'

export function WorkoutSessionDetail() {
  return (
    <Stack>
      <Title>Velkommen tilbake!</Title>
      <WorkoutSessionFeed />
    </Stack>
  )
}
