import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  WithFieldValue,
} from 'firebase/firestore'
import { Exercise } from '../exercise/types'

export type WorkoutSession = {
  title: string
  createdAt: string | Date
  createdBy: string
  tags?: Array<string>
}

export type WorkoutSessionDocument = WorkoutSession & {
  id: string
}

export type WorkoutSessionWithTimestamp = Omit<
  WorkoutSessionDocument,
  'createdAt'
> & {
  createdAt: Timestamp
}

export const workoutSessionConverter: FirestoreDataConverter<WorkoutSessionDocument> =
  {
    toFirestore: (
      workoutSession: WithFieldValue<WorkoutSessionDocument>
    ): DocumentData => {
      return {
        title: workoutSession.title,
        createdAt: workoutSession.createdAt,
        createdBy: workoutSession.createdBy,
      }
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): WorkoutSessionDocument {
      const data = snapshot.data(options)
      return {
        id: snapshot.id,
        title: data.title,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        tags: data.tags,
      }
    },
  }
