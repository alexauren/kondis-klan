import { Exercise } from '../exercise/types'
import { WorkoutSession } from '../workoutsession/types'
import { WorkoutCard } from '../workoutsession/workoutcard/WorkoutCard'

// Define a WorkoutSession object
const session: WorkoutSession = {
  title: 'Upper Body Workout',
  createdAt: '2023-02-14',
  createdBy: 'John Doe',
  exercises: [
    { name: 'Bench Press', reps: 10, sets: 3, weight: 135 },
    { name: 'Pull-Ups', reps: 8, sets: 3 },
    { name: 'Shoulder Press', reps: 12, sets: 3, weight: 50 },
    { name: 'Planke', sets: 3, duration: 25 },
  ],
}

// Define an array of Exercise objects
const exercises: Exercise[] = session.exercises || []

// Render the WorkoutCard component with the session and exercises props
export function Workouts() {
  return (
    <div>
      <WorkoutCard workoutsession={session} exercises={exercises} />
    </div>
  )
}
