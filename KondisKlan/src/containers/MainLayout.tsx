import {
  AppShell,
  Badge,
  Burger,
  createStyles,
  Group,
  Header,
  MediaQuery,
  useMantineTheme,
  Text,
  Image,
} from '@mantine/core'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from 'assets/logo.png'
import NavBar from 'containers/NavBar'
import { useMobile } from 'util/hooks'
import { HeaderCustom } from './Header'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useMantineTheme()
  const [sidebarOpen, toggleSidebar] = useState(false)
  const isMobile = useMobile()
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors['kondisGreen'][2],
        },
      }}
      navbar={<NavBar isHidden={isMobile ? sidebarOpen : false} />}
      header={
        <HeaderCustom
          toggleSidebarCallBack={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
      }
    >
      {children}
    </AppShell>
  )
}

export default MainLayout
