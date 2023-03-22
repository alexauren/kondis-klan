import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import { UserType } from 'modules/user/types'
import { UserContext } from 'modules/user/UserAuthContext'
import { WorkoutCard } from 'modules/workoutsession/components/WorkoutCard'
import { useContext } from 'react'
import { useWorkoutSessionCollectionWithQuery } from '../../../firebase/queries/workoutSessionQueries'
import { WorkoutSessionWithTimestamp } from '../types'
// Render the WorkoutCard component with the session and exercises props
export function WorkoutSessionFeed() {
  const loggedInUser = useContext(UserContext) as UserType
  const { data, error, loading } =
    useWorkoutSessionCollectionWithQuery(loggedInUser)

  if (loading) {
    return <FullContentLoader />
  }

  if (error || !data) {
    return <div>Error: {error!.message}</div>
  }

  const workouts = data as WorkoutSessionWithTimestamp[]
  return (
    <Stack>
      {workouts.map(workout => (
        <WorkoutCard
          key={workout.id}
          onCompleteCallback={() => {}}
          workoutsession={workout}
        />
      ))}
    </Stack>
  )
}
