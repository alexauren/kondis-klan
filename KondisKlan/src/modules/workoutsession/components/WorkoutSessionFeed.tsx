import { Stack } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { UserType } from 'modules/user/types'
import { UserContext } from 'modules/user/UserAuthContext'
import { WorkoutCard } from 'modules/workoutsession/components/WorkoutCard'
import { useContext } from 'react'
import {
  useMyCompletedWorkouts,
  useMyWorkouts,
  useWorkoutSessionCollectionWithQuery,
} from '../../../firebase/queries/workoutSessionQueries'
import { WorkoutSessionComplete, WorkoutSessionWithTimestamp } from '../types'
import { sortWorkoutsByDesc } from '../util'
// Render the WorkoutCard component with the session and exercises props
export function WorkoutSessionFeed() {
  const loggedInUser = useContext(UserContext) as UserType
  const { data, error, loading } =
    useWorkoutSessionCollectionWithQuery(loggedInUser)
  const {
    data: data2,
    error: error2,
    loading: loading2,
  } = useMyWorkouts(loggedInUser.uid)
  const {
    data: data3,
    error: error3,
    loading: loading3,
  } = useMyCompletedWorkouts(loggedInUser.uid)

  if (loading || loading2 || loading3) {
    return <FullContentLoader />
  }

  if (error || !data || error2 || !data2 || error3 || !data3) {
    return <FullPageError />
  }

  const workoutsByTags = data as WorkoutSessionWithTimestamp[]
  const workoutsByUser = data2 as WorkoutSessionWithTimestamp[]
  const completedWorkouts = data3 as WorkoutSessionComplete[]

  const workouts = [...workoutsByTags, ...workoutsByUser, ...completedWorkouts]
  const workoutsSorted = sortWorkoutsByDesc(workouts)
  return (
    <Stack>
      {workoutsSorted.map(workout => (
        <WorkoutCard
          key={workout.id}
          onCompleteCallback={() => {}}
          workoutsession={workout}
        />
      ))}
    </Stack>
  )
}
