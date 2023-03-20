import { useState } from 'react'
import {
  Navbar,
  Center,
  Tooltip,
  Text,
  UnstyledButton,
  createStyles,
  Stack,
  Image,
  Group,
  Button,
} from '@mantine/core'
import {
  Icon,
  IconHome2,
  IconUser,
  IconSettings,
  IconLogout,
  IconPlus,
  IconChartHistogram,
} from '@tabler/icons-react'
import Logo from 'assets/logo.png'
import { useMobile } from 'util/hooks'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'

interface NavbarLinkProps {
  icon: Icon
  link: string
  label: string
  active?: boolean
  onClick?(): void
  to: string
  disabled?: boolean
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  link,
  disabled,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  const isMobile = useMobile()
  return (
    <Tooltip label={label} withinPortal position="right" transitionDuration={0}>
      <UnstyledButton
        component={Link}
        to={disabled ? '#' : link}
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Group>
          {isMobile && <Text>{label}</Text>}
          <Icon stroke={1.5} />
        </Group>
      </UnstyledButton>
    </Tooltip>
  )
}

interface NavbarMinimalProps {
  isHidden: boolean
}

export default function NavbarMinimal({ isHidden }: NavbarMinimalProps) {
  const [active, setActive] = useState(0)
  const auth = getAuth()
  const loggedInUser = auth.currentUser
  const { classes } = useStyles()

  const mockdata = [
    { icon: IconHome2, label: 'Hjem', link: '/' },
    { icon: IconPlus, label: 'Ny økt', link: '/newprogram' },
    { icon: IconUser, label: 'Profil', link: `/profile/${loggedInUser!.uid}` },
    { icon: IconChartHistogram, label: 'Progresjon', link: '/progression' },
  ]

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
      to={link.link}
    />
  ))

  return (
    <Navbar
      hidden={isHidden}
      p="md"
      hiddenBreakpoint="xs"
      width={{ lg: 80, sm: 200, xs: 200 }}
      style={{
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        fontSize: '12px',
      }}
      className={classes.navbar}
    >
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={10}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            link="/"
            to="/"
            icon={IconLogout}
            label="Logg ut"
            onClick={() => signOut(auth)}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}

const useStyles = createStyles(theme => ({
  link: {
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
  navbar: {
    backgroundColor: theme.white,
  },
}))
