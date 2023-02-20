// I want to create a firebase query that will return a list of all the users in the database

import { collection } from 'firebase/firestore'
import { db } from 'containers/Root'

export const exampleDocRef = collection(db, 'workoutsessions')
