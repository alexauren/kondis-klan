// I want to create a firebase query that will return a list of all the users in the database

import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../App'

export const exampleDocRef = collection(db, "workoutsessions");

function useExerciseCollection(documentRef: string) {
    //use useCollectionData to get the data from the collection
    const [data, loading, error] = useCollectionData(
        collection(db, documentRef));
    return { data, loading, error };
}

function useExerciseDocument(collectionRef: string) {
    //use useDocumentData to get the data from the document
    const [data, loading, error] = useCollectionData(
        collection(db, collectionRef));
    return { data, loading, error };
}

