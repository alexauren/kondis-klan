export type WorkoutSession = {
    title: string
    createdAt: string
    createdBy: string
}

export type WorkoutSessionDocument = WorkoutSession & {
    id: string
}