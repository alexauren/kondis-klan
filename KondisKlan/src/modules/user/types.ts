export type UserType = {
  authProvider: string
  email: string
  friends?: string[]
  interests?: string[]
  name: string
  public?: boolean
  uid: string
}

export type TimeRM = {
  time: Date
  rm: number
}

export type ExerciseProgressType = {
  progression: Array<TimeRM>
}
