import { db } from 'containers/Root'
import { UserInfo } from 'firebase/auth'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'

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
    friends: [],
    interests: ['yoga'],
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
