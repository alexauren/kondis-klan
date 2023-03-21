import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import { WorkoutCard } from 'modules/workoutsession/components/WorkoutCard'
import { WorkoutSessionWithTimestamp } from 'modules/workoutsession/types'
import { useMyWorkouts } from '../../../firebase/queries/workoutSessionQueries'
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
