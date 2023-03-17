import { createContext } from 'react'
import { DocumentData } from '@firebase/firestore'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { getAuth } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { db } from 'containers/Root'

export function GetUserRef() {
  const auth = getAuth().currentUser
  const userRef = doc(db, `users/${auth?.uid}`)
  return userRef
}

const UserContext = createContext<DocumentData>({
  authProvider: '',
  email: '',
  friends: [],
  interests: [],
  name: '',
  public: false,
  uid: '',
})

interface UserProviderProps {
  children: React.ReactNode
}

function UserProvider({ children }: UserProviderProps) {
  const [user, loading, error] = useDocumentData(GetUserRef())
  if (loading) {
    return <FullContentLoader />
  }
  if (error) {
    return <FullPageError />
  }
  if (!user) {
    return <FullPageError />
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export { UserProvider, UserContext }
