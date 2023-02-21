import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import { WorkoutCard } from 'modules/workoutsession/components/WorkoutCard'
import { useWorkoutSessionCollection } from '../../../firebase/queries/workoutSessionQueries'
import { Exercise } from '../../exercise/types'
import { WorkoutSession, WorkoutSessionDocument } from '../types'
// Render the WorkoutCard component with the session and exercises props
export function WorkoutSessionFeed() {
  const { data, error, loading } = useWorkoutSessionCollection()

  if (loading) {
    return <FullContentLoader />
  }

  if (error || !data) {
    return <span>Error</span>
  }

  const workouts = data as WorkoutSessionDocument[]
  return (
    <Stack>
      {workouts.map(workout => (
        <WorkoutCard
          key={workout.id}
          workoutsession={workout}
          exercises={workout.exercises || []}
        />
      ))}
    </Stack>
  )
}
