import { Stack } from '@mantine/core'
import { NewProgram } from 'modules/newprogram/NewProgram'
import { WorkoutSessionFeed } from 'modules/workoutsession/components/WorkoutSessionFeed'

export function WorkoutSessionDetail() {
  return (
    <Stack>
      <h2>Velkommen tilbake!</h2>
      <NewProgram />
      <WorkoutSessionFeed />
    </Stack>
  )
}
