import { Exercise, ExerciseConditioning, ExerciseStrength } from './types'

export function determineExerciseType(exercise: Exercise) {
  if (exercise.weight) {
    const { weight, reps, sets, name } = exercise
    const strengthExercise: ExerciseStrength = {
      weight,
      reps,
      sets,
      name,
      type: 'strength',
    }
    return strengthExercise
  }
  const { duration, name } = exercise
  const conditioningExercise: ExerciseConditioning = {
    duration,
    name,
    type: 'conditioning',
  }
  return conditioningExercise
}
