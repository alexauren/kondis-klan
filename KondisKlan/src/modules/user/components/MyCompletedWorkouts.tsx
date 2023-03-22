import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import { WorkoutCardCompleted } from 'modules/workoutsession/components/WorkoutCardCompleted'
import { WorkoutSessionComplete } from 'modules/workoutsession/types'
import { addToStreak, streakChecker } from 'modules/workoutsession/util'
import { useContext, useEffect } from 'react'
import { useMyCompletedWorkouts } from '../../../firebase/queries/workoutSessionQueries'
import { UserType } from '../types'
import { UserContext } from '../UserAuthContext'
// Render the WorkoutCard component with the session and exercises props

interface MyWorkoutsProps {
  userId: string
  lastWorkoutsCallback: (workouts: WorkoutSessionComplete[]) => void
}

export function MyCompletedWorkouts({
  userId,
  lastWorkoutsCallback,
}: MyWorkoutsProps) {
  const { data, error, loading } = useMyCompletedWorkouts(userId)
  const loggedInUser = useContext(UserContext) as UserType

  if (loading) {
    return <FullContentLoader />
  }

  if (error) {
    return <span>{error.message}</span>
  }

  const workouts = data as WorkoutSessionComplete[]

  function handleStreak(workouts: WorkoutSessionComplete[]) {
    addToStreak({ workouts, user: loggedInUser })
    lastWorkoutsCallback(workouts)
  }
  lastWorkoutsCallback(workouts)

  streakChecker({ workouts })
  return (
    <Stack>
      {workouts.map(workout => (
        <WorkoutCardCompleted
          key={workout.id}
          onCompleteCallback={() => handleStreak(workouts)}
          workoutsession={workout}
        />
      ))}
    </Stack>
  )
}
