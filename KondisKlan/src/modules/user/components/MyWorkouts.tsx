import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import { WorkoutCard } from 'modules/workoutsession/components/WorkoutCard'
import {
  WorkoutSessionComplete,
  WorkoutSessionWithTimestamp,
} from 'modules/workoutsession/types'
import { addToStreak } from 'modules/workoutsession/util'
import { useContext } from 'react'
import { useMyWorkouts } from '../../../firebase/queries/workoutSessionQueries'
import { UserType } from '../types'
import { UserContext } from '../UserAuthContext'
// Render the WorkoutCard component with the session and exercises props

interface MyWorkoutsProps {
  userId: string
  lastCompletedWorkouts: WorkoutSessionComplete[]
}

export function MyWorkouts({ userId, lastCompletedWorkouts }: MyWorkoutsProps) {
  const { data, error, loading } = useMyWorkouts(userId)
  const loggedInUser = useContext(UserContext) as UserType

  if (loading) {
    return <FullContentLoader />
  }

  if (error) {
    return <span>{error.message}</span>
  }

  const workouts = data as WorkoutSessionWithTimestamp[]
  return (
    <Stack>
      {workouts.map(workout => (
        <WorkoutCard
          key={workout.id}
          onCompleteCallback={() =>
            addToStreak({ workouts: lastCompletedWorkouts, user: loggedInUser })
          }
          workoutsession={workout}
        />
      ))}
    </Stack>
  )
}
