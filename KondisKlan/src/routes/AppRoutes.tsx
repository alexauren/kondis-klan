import { FullContentLoader } from 'components/FullContentLoader'
import FullPageLoader from 'components/FullPageLoader'
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

  if (error) {
    console.error(error)
    alert(error.message)
  }

  if (loading) {
    return <FullPageLoader />
  }

  if (user) {
    console.log('now in private routes, possibly skipped user doc creation')
    return <PrivateRoutes />
  }

  return <PublicRoutes />
}

export default AppRoutes
