export type Exercise = {
  name: string
  reps?: number
  sets?: number
  weight?: number
  duration?: number
}

export type ExerciseStrength = Omit<Exercise, 'duration'> & {
  type: 'strength'
}

export type ExerciseConditioning = Pick<Exercise, 'name' | 'duration'> & {
  type: 'conditioning'
}

export type ExerciseType = 'strength' | 'conditioning'
