// I want to create a firebase query that will return a list of all the users in the database

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { db } from 'containers/Root'
import { Exercise } from 'modules/exercise/types'
import { ExerciseProgressType } from 'modules/user/types'

export function useExerciseCollection(documentRef: string) {
  console.log('HELLO')
  //use useCollectionData to get the data from the collection
  const [data, loading, error] = useCollectionData(
    collection(db, `workoutsessions/${documentRef}/exercises`)
  )

  return { data, loading, error }
}

export function useCompletedExerciseCollection(documentRef: string) {
  console.log('HELLO')
  //use useCollectionData to get the data from the collection
  const [data, loading, error] = useCollectionData(
    collection(db, `completedworkouts/${documentRef}/exercises`)
  )

  return { data, loading, error }
}

export function useExerciseDocument(
  workoutSessionRef: string,
  exerciseRef: string
) {
  //use useDocumentData to get the data from the document
  const [data, loading, error] = useDocumentData(
    doc(db, `workoutsessions/${workoutSessionRef}/exercises/${exerciseRef}`)
  )
  return { data, loading, error }
}

export async function addExerciseDocument(
  workoutSessionRef: string,
  data: Exercise
) {
  //use addDoc to add a document to the collection
  return await addDoc(
    collection(db, `workoutsessions/${workoutSessionRef}/exercises`),
    data
  )
}

export async function addCompletedExerciseDocument(
  workoutSessionRef: string,
  data: Exercise
) {
  //use addDoc to add a document to the collection
  return await addDoc(
    collection(db, `completedworkouts/${workoutSessionRef}/exercises`),
    data
  )
}

export async function addRmMax(
  userid: string,
  exercise: Exercise,
  date: Timestamp
) {
  console.log('Her begynner rm max funksjonen')
  const exerciseName = exercise.name.toLowerCase().replace(/ /g, '')
  const onerm = exercise.weight! * (36 / (37 - exercise.reps!))

  //handle if there is no data in firebase for this exercise

  const currentRmMaxProgress = await getExerciseProgress(
    userid,
    exerciseName
  ).then(exerciseData => {
    //check if there is any data in firebase for this exercise
    if (exerciseData === undefined) {
      console.log('Her er det ingen data')
      const exerciseRef = doc(db, `users/${userid}/progresjon/${exerciseName}`)
      const newRmMaxProgress = {
        progression: [{ time: date, rm: onerm }],
        name: exercise.name,
      }
      setDoc(exerciseRef, newRmMaxProgress)
    }
    return exerciseData
  })

  currentRmMaxProgress.progression.push({ time: date, rm: onerm })

  //update firebase with new data
  const exerciseRef = doc(db, `users/${userid}/progresjon/${exerciseName}`)
  await setDoc(exerciseRef, currentRmMaxProgress)
}

export async function getExerciseProgress(userid: string, exercise: string) {
  const exerciseName = exercise.toLowerCase().replace(/ /g, '')
  const exerciseRef = doc(db, `users/${userid}/progresjon/${exerciseName}`)
  const exerciseData = await getDoc(exerciseRef).then(doc => doc.data())
  return exerciseData as ExerciseProgressType
}

async function removeExerciseDocument(
  workoutSessionRef: string,
  documentRef: string
) {
  //use deleteDoc to delete a document from the collection
  const docRef = await deleteDoc(
    doc(db, `workoutsessions/${workoutSessionRef}/exercises`, documentRef)
  )
  console.log('Document successfully deleted!')
}

async function updateExerciseDocument(
  workoutSessionRef: string,
  documentRef: string,
  data: Exercise
) {
  //use setDoc to update a document in the collection
  const docRef = await setDoc(
    doc(db, `workoutsessions/${workoutSessionRef}/exercises`, documentRef),
    data
  )
  console.log('Document successfully updated!')
}

export async function addExercise(exercise: string | null) {
  const exerciseRef = doc(db, 'exercises', 'kbbjPMMnikSyEdFrZaTf')
  const exercises = await getDoc(exerciseRef).then(doc => doc.data())
  const exerciseList = exercises?.exercises
  console.log('ex list' + exerciseList)

  exerciseList.push(exercise)
  const exerciseArray = Array.from(new Set(exerciseList))
  console.log(exerciseArray)
  await updateDoc(exerciseRef, {
    exercises: exerciseArray,
  })
}
