import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import { WorkoutCard } from 'modules/workoutsession/components/WorkoutCard'
import {
  useMyWorkouts,
  useWorkoutSessionCollection,
} from '../../../firebase/queries/workoutSessionQueries'
import { Exercise } from '../../exercise/types'
import {
  WorkoutSession,
  WorkoutSessionDocument,
  WorkoutSessionWithTimestamp,
} from 'modules/workoutsession/types'
// Render the WorkoutCard component with the session and exercises props

interface MyWorkoutsProps {
  userId: string
}

export function MyWorkouts({ userId }: MyWorkoutsProps) {
  const { data, error, loading } = useMyWorkouts(userId)

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
        <WorkoutCard key={workout.id} workoutsession={workout} />
      ))}
    </Stack>
  )
}
