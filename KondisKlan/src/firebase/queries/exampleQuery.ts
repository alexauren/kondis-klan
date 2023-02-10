// I want to create a firebase query that will return a list of all the users in the database

import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../App'

export const exampleDocRef = collection(db, "workoutsessions");