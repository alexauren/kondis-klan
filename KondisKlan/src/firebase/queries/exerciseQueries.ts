// I want to create a firebase query that will return a list of all the users in the database

import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../App'
import { Exercise } from '../../modules/exercise/types';    

export function useExerciseCollection(documentRef: string) {
    console.log("HELLO")
    //use useCollectionData to get the data from the collection
    const [data, loading, error] = useCollectionData(
        collection(db, `workoutsessions/${documentRef}/exercises`));

    return { data, loading, error };
}

export function useExerciseDocument(workoutSessionRef: string, exerciseRef: string) {
    //use useDocumentData to get the data from the document
    const [data, loading, error] = useDocumentData(
        doc(db, `workoutsessions/${workoutSessionRef}/exercises/${exerciseRef}`));
    return { data, loading, error };
}

export async function addExerciseDocument(workoutSessionRef: string, data: Exercise) {
    //use addDoc to add a document to the collection
    const docRef = await addDoc(collection(db, `workoutsessions/${workoutSessionRef}/exercises`), data);
    console.log("Document written with ID: ", docRef.id);
}

async function removeExerciseDocument(workoutSessionRef: string, documentRef: string) {
    //use deleteDoc to delete a document from the collection
    const docRef = await deleteDoc(doc(db, `workoutsessions/${workoutSessionRef}/exercises`, documentRef));
    console.log("Document successfully deleted!");
}

async function updateExerciseDocument(workoutSessionRef: string, documentRef: string, data: Exercise) {
    //use setDoc to update a document in the collection
    const docRef = await setDoc(doc(db, `workoutsessions/${workoutSessionRef}/exercises`, documentRef), data);
    console.log("Document successfully updated!");
}