import { UserInfo } from 'firebase/auth'
import { db } from 'containers/Root'
import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  DocumentData,
  collection,
  query,
  orderBy,
  where,
  getDocs,
} from 'firebase/firestore'
import {
  useCollectionData,
  useDocument,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { WorkoutSessionComplete } from 'modules/workoutsession/types'

export async function createUserDoc(
  { uid, email }: UserInfo,
  displayName: string
) {
  await setDoc(doc(db, 'users', uid), {
    uid: uid,
    name: displayName,
    authProvider: 'local',
    email: email,
    public: true,
  })
}

async function updateUser(userId: string, attribute: string, value: any) {
  const user = doc(db, 'users', userId)
  await updateDoc(user, {
    attribute: value,
  })
  console.log(value)
}

export async function updateUserVisibility(
  userId: string,
  visibility: boolean
) {
  const user = doc(db, 'users', userId)
  await updateDoc(user, {
    public: visibility,
  })
}

export async function addUserInterests(userId: string, interestList: string[]) {
  const user = doc(db, 'users', userId)
  await updateDoc(user, {
    interests: interestList,
  })
  console.log('Interests added')
}

/* export async function getUserInterests(userId: string) {
  const userRef = doc(db, 'users', userId)
  const value = useDocumentData(userRef)[0]?.interests
  return value
} */

export async function setUserInterests(userId: string, interests: string[]) {
  const user = doc(db, 'users', userId)
  console.log('trying to set user interests now')
  await updateDoc(user, {
    interests: interests,
  })
}

export async function updateTagsCollection(tag: string | null) {
  const tagsRef = doc(db, 'tags', 'ZP3S5zqtbEnjYZRvKMxB')
  const tags = await getDoc(tagsRef).then(doc => doc.data())
  const tagsList = tags?.tags

  tagsList.push(tag)
  const tagsArray = Array.from(new Set(tagsList))

  await updateDoc(tagsRef, {
    tags: tagsArray,
  })
}

export function useUserDocument(uid: string) {
  const userDocumentRef = doc(db, `users/${uid}`)
  const [data, loading, error] = useDocumentData<DocumentData>(userDocumentRef)

  return { data, loading, error }
}

export function useUserCollection() {
  const collectionRef = collection(db, 'users')
  const querydata = query(
    collectionRef,
    where('public', '==', true),
    orderBy('name', 'asc')
  )
  const [data, loading, error] = useCollectionData<DocumentData>(querydata)
  return { data, loading, error }
}

export function resetStreak(userId: string) {
  const user = doc(db, 'users', userId)
  updateDoc(user, {
    streak: 0,
  })
}

export async function incrementStreak(userId: string) {
  const userRef = doc(db, 'users', userId)
  const currentStreak =
    ((await getDoc(userRef).then(doc => doc.data())) as number) || 0
  await updateDoc(userRef, { streak: currentStreak + 1 })
}
