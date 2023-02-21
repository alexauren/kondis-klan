import { auth } from 'containers/Root'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import PrivateRoutes from 'routes/PrivateRoutes'
import PublicRoutes from 'routes/PublicRoutes'

const AppRoutes: React.FC = () => {
  // TODO: Create conditionals based on if
  // user is logged in or not
  // For now we are simply returning PublicRoutes

  // get logged in user from firebase
  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)
  console.log('user: ', user)

  if (error) {
    console.error(error)
    alert(error.message)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return <PrivateRoutes />
  }

  return <PublicRoutes />
}

export default AppRoutes
