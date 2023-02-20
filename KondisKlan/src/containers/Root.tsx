import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from 'routes/AppRoutes'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from 'firebase/firebaseConfig'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

function Root() {
  // Root is the top level component that wraps the entire app
  // It is used to provide the MantineProvider and the BrowserRouter
  // MantineProvider is used to provide the Mantine theme to the app
  // BrowserRouter is used to provide the routing functionality to the app
  // MantineProvider gives us access to some extra functionality besides just using the components
  // Such as modal dialogs, notifications, and more

  const mantineTheme: MantineThemeOverride = {
    colors: {
      kondisGreen: ['#c9efc7'],
      kondisGreenDark: ['#a1d6a3'],
      kondisGreenLight: ['#e5f7e5'],
    },
    primaryShade: 6,
    primaryColor: 'teal',
  }

  return (
    <MantineProvider theme={mantineTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default Root
