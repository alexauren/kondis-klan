import { Stack } from '@mantine/core'
import { WorkoutSessionFeed } from 'modules/workoutsession/components/WorkoutSessionFeed'

export function WorkoutSessionDetail() {
  return (
    <Stack>
      <h2>Velkommen tilbake!</h2>
      <WorkoutSessionFeed />
    </Stack>
  )
}
