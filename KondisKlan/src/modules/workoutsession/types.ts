import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore"
import { Exercise } from "../exercise/types"

export type WorkoutSession = {
    title: string
    createdAt: string
    createdBy: string
    exercises?: Exercise[]
}

export type WorkoutSessionDocument = WorkoutSession & {
    id: string
}

export const workoutSessionConverter: FirestoreDataConverter<WorkoutSessionDocument> = { 
    toFirestore: (workoutSession: WithFieldValue<WorkoutSessionDocument>): DocumentData => {
        return { 
            title: workoutSession.title,
            createdAt: workoutSession.createdAt,
            createdBy: workoutSession.createdBy,
            exercises: workoutSession.exercises
        };
    },
    fromFirestore (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): WorkoutSessionDocument {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            title: data.title,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
            exercises: data.exercises
        };
    },
};
