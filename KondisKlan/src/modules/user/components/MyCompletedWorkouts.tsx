import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import { WorkoutCard } from 'modules/workoutsession/components/WorkoutCard'
import {
  useMyCompletedWorkouts,
  useMyWorkouts,
  useWorkoutSessionCollection,
} from '../../../firebase/queries/workoutSessionQueries'
import { Exercise } from '../../exercise/types'
import {
  WorkoutSession,
  WorkoutSessionDocument,
  WorkoutSessionWithTimestamp,
} from 'modules/workoutsession/types'
import { WorkoutCardCompleted } from 'modules/workoutsession/components/WorkoutCardCompleted'
// Render the WorkoutCard component with the session and exercises props

interface MyWorkoutsProps {
  userId: string
}

export function MyCompletedWorkouts({ userId }: MyWorkoutsProps) {
  const { data, error, loading } = useMyCompletedWorkouts(userId)

  if (loading) {
    return <FullContentLoader />
  }

  if (error) {
    return <span>{error.message}</span>
  }

  console.log('completedWorkouts: ', data)

  const workouts = data as WorkoutSessionWithTimestamp[]
  return (
    <Stack>
      {workouts.map(workout => (
        <WorkoutCardCompleted key={workout.id} workoutsession={workout} />
      ))}
    </Stack>
  )
}
