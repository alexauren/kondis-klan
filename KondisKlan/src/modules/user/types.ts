import { Timestamp } from 'firebase/firestore'

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
  time: Timestamp
  rm: number
}

export type ExerciseProgressType = {
  name: string
  progression: Array<TimeRM>
}
