import { Stack, Title } from '@mantine/core'
import { useUserCollection } from 'firebase/queries/userQueries'
import { UserSearch } from 'modules/user/components/UserSearch'
import { UserType } from 'modules/user/types'
import { UserContext } from 'modules/user/UserAuthContext'
import { WorkoutSessionFeed } from 'modules/workoutsession/components/WorkoutSessionFeed'
import { useContext } from 'react'

export function WorkoutSessionDetail() {
  const user = useContext(UserContext)
  const { data, loading, error } = useUserCollection()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const users = data as UserType[]

  return (
    <Stack>
      <Title color={'kondisGreen.7'}>Velkommen tilbake, {user.name}!</Title>
      <WorkoutSessionFeed />
    </Stack>
  )
}
