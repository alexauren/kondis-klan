import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import { WorkoutCardCompleted } from 'modules/workoutsession/components/WorkoutCardCompleted'
import { WorkoutSessionComplete } from 'modules/workoutsession/types'
import { useMyCompletedWorkouts } from '../../../firebase/queries/workoutSessionQueries'
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

  const workouts = data as WorkoutSessionComplete[]
  return (
    <Stack>
      {workouts.map(workout => (
        <WorkoutCardCompleted key={workout.id} workoutsession={workout} />
      ))}
    </Stack>
  )
}
