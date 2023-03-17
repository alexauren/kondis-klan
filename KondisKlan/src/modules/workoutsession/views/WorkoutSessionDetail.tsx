import { Stack, Title } from '@mantine/core'
import { UserContext } from 'modules/user/UserAuthContext'
import { WorkoutSessionFeed } from 'modules/workoutsession/components/WorkoutSessionFeed'
import { useContext } from 'react'

export function WorkoutSessionDetail() {
  const user = useContext(UserContext)
  return (
    <Stack>
      <Title color={'kondisGreen.7'}>Velkommen tilbake, {user.name}!</Title>
      <WorkoutSessionFeed />
    </Stack>
  )
}
