import { UserInfo } from 'firebase/auth'
import { db } from 'containers/Root'
import { setDoc, doc, updateDoc } from 'firebase/firestore'

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

  // updateUser({ uid, email } , displayName, true)
}

/* export async function updateUser({ uid, email }: UserInfo, displayName: string, publicProfile: boolean) {
    await setDoc(doc(db, 'users', uid), {
        uid: uid,
        name: displayName,
        authProvider: 'local',
        email: email,
        public: publicProfile
      })
} */

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
  console.log('Finito?')
}
