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

export type WorkoutSessionComplete = WorkoutSessionWithTimestamp & {
  completedAt: Timestamp
  completedBy: string
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
      }
    },
  }

export const workoutSessionCompletedConverter: FirestoreDataConverter<WorkoutSessionComplete> =
  {
    toFirestore: (
      workoutSession: WithFieldValue<WorkoutSessionComplete>
    ): DocumentData => {
      return {
        title: workoutSession.title,
        createdAt: workoutSession.createdAt,
        createdBy: workoutSession.createdBy,
        completedAt: workoutSession.completedAt,
        completedBy: workoutSession.completedBy,
      }
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): WorkoutSessionComplete {
      const data = snapshot.data(options)
      return {
        id: snapshot.id,
        title: data.title,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        completedAt: data.completedAt,
        completedBy: data.completedBy,
      }
    },
  }
