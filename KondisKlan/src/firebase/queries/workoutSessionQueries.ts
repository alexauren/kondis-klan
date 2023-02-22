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
} from 'firebase/firestore'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { db } from 'containers/Root'
import {
  WorkoutSession,
  workoutSessionConverter,
  WorkoutSessionDocument,
} from 'modules/workoutsession/types'

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
