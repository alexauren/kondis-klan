import {
  Burger,
  Group,
  MediaQuery,
  Header,
  Image,
  Text,
  useMantineTheme,
  createStyles,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import Logo from 'assets/logo.png'

interface HeaderCustomProps {
  toggleSidebarCallBack: (sidebarOpen: boolean) => void
  sidebarOpen: boolean
}

export function HeaderCustom({
  toggleSidebarCallBack,
  sidebarOpen,
}: HeaderCustomProps) {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  return (
    <Header height={70} p="md" className={classes.wrapper}>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
          <Burger
            opened={!sidebarOpen}
            onClick={() => toggleSidebarCallBack(!sidebarOpen)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Group className={classes.header}>
          <Group>
            <Image src={Logo} radius={'md'} width={48} height={48} />
            <Text component={Link} to="/" weight={300} size="xl">
              KondisKlan
            </Text>
          </Group>
        </Group>
      </div>
    </Header>
  )
}

const useStyles = createStyles(theme => ({
  header: {
    width: '100%',
    justifyContent: 'space-between',
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      flexDirection: 'row-reverse',
    },
  },
  wrapper: {
    backgroundColor: theme.white,
  },
}))
