import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { db } from 'containers/Root'
import {
  WorkoutSession,
  WorkoutSessionComplete,
  workoutSessionConverter,
  WorkoutSessionDocument,
  WorkoutSessionWithTimestamp,
  workoutSessionCompletedConverter,
} from 'modules/workoutsession/types'
import { IconSquareRoundedChevronsRightFilled } from '@tabler/icons-react'
import { UserType } from 'modules/user/types'

export function useWorkoutSessionCollection() {
  //use useCollectionData to get the data from the collection
  const collectionRef = collection(db, 'workoutsessions').withConverter(
    workoutSessionConverter
  )
  const querydata = query(collectionRef, orderBy('createdAt', 'desc'))
  const [data, loading, error] = useCollectionData<DocumentData>(querydata)
  return { data, loading, error }
}

export function useWorkoutSessionDocument(workoutSessionId: string) {
  //use useDocumentData to get the data from the document
  const [data, loading, error] = useDocumentData<DocumentData>(
    doc(db, `workoutsessions/${workoutSessionId}`)
  )
  return { data, loading, error }
}

export async function addWorkoutSession(workoutSession: WorkoutSession) {
  //use addDoc to add a document to the collection
  return await addDoc(collection(db, 'workoutsessions'), workoutSession)
}

export async function updateWorkoutSession(
  workoutSession: WorkoutSessionDocument
) {
  //use setDoc to update a document in the collection
  await setDoc(doc(db, workoutSession.id), workoutSession)
}

export async function deleteWorkoutSession(workoutSessionId: string) {
  //use deleteDoc to delete a document in the collection
  //we also need to first delete the subcollection of the document
  const subCollection = collection(db, workoutSessionId, 'exercises')

  const querySnapshot = await getDocs(subCollection)
  querySnapshot.forEach(doc => {
    deleteDoc(doc.ref)
  })

  await deleteDoc(doc(db, workoutSessionId))
}

export function useMyWorkouts(userId: string) {
  const collectionRef = collection(db, 'workoutsessions').withConverter(
    workoutSessionConverter
  )
  const querydata = query(
    collectionRef,
    orderBy('createdAt', 'desc'),
    where('createdBy', '==', userId)
  )
  const [data, loading, error] = useCollectionData<DocumentData>(querydata)
  return { data, loading, error }
}

export function useMyCompletedWorkouts(userId: string) {
  const collectionRef = collection(db, 'completedworkouts').withConverter(
    workoutSessionCompletedConverter
  )
  const querydata = query(
    collectionRef,
    orderBy('completedAt', 'desc'),
    where('completedBy', '==', userId)
  )
  const [data, loading, error] = useCollectionData<DocumentData>(querydata)
  return { data, loading, error }
}

interface SendWorkoutToCompletedProps {
  workout: WorkoutSessionWithTimestamp
  completedBy: string
  completedAt: string | Timestamp
}

export async function SendWorkoutToCompleted({
  workout,
  completedAt,
  completedBy,
}: SendWorkoutToCompletedProps) {
  // this is the reference to completed workouts
  const collectionRef = collection(db, 'completedworkouts')

  if (!workout.tags) {
    workout.tags = []
  }

  // this is where we create the object to be sent
  const completedWorkout = {
    title: workout.title,
    createdAt: workout.createdAt,
    createdBy: workout.createdBy,
    tags: workout.tags,
    completedAt: completedAt,
    completedBy: completedBy,
  }

  // now we add the document to firebase using AddDoc

  //use addDoc to add a document to the collection
  return await addDoc(collectionRef, completedWorkout)
}

export function useWorkoutSessionCollectionWithQuery(user: UserType) {
  //use useCollectionData to get the data from the collection
  const collectionRef = collection(db, 'workoutsessions').withConverter(
    workoutSessionConverter
  )
  if (user.interests?.length === 0) {
    user.interests = ['yoga']
  }
  const querydata = query(
    collectionRef,
    where('tags', 'array-contains-any', user.interests),
    orderBy('createdAt', 'desc')
  )
  const [data, loading, error] = useCollectionData<DocumentData>(querydata)
  return { data, loading, error }
}
