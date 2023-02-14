import { Exercise } from "../exercise/types"

export type WorkoutSession = {
    title: string
    createdAt: string
    createdBy: string
    exercises?: Exercise[]
}