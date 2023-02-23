import { useState } from 'react'
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
} from '@mantine/core'
} from '@mantine/core'
import {
  Icon,
  IconHome2,
  IconUser,
  IconSettings,
  IconLogout,
  IconPlus,
} from '@tabler/icons-react'
import Logo from 'assets/logo.png'
import { useMobile } from 'util/hooks'
import { useNavigate } from 'react-router-dom'

interface NavbarLinkProps {
  icon: Icon
  label: string
  active?: boolean
  onClick?(): void
  to: string
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  const isMobile = useMobile()
  return (
    <Tooltip label={label} withinPortal position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Group>
          {isMobile && <Text>{label}</Text>}
          <Icon stroke={1.5} />
          {isMobile && <Text>{label}</Text>}
          <Icon stroke={1.5} />
        </Group>
      </UnstyledButton>
    </Tooltip>
  )
}

const mockdata = [
  { icon: IconHome2, label: 'Home', link: '/' },
  { icon: IconPlus, label: 'New program', link: '/newprogram' },
  { icon: IconUser, label: 'Profile', link: '/profile' },
  { icon: IconSettings, label: 'Settings', link: '/settings' },
  { icon: IconLogout, label: 'Logout', link: '/login' },
]

interface NavbarMinimalProps {
  isHidden: boolean
}

export default function NavbarMinimal({ isHidden }: NavbarMinimalProps) {
  const [active, setActive] = useState(0)

  let navigate = useNavigate()

  function click(link: string, index: number) {
    navigate(link)
    return setActive(index)
  }

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => click(link.link, index)}
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
        backgroundColor: 'white',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        fontSize: '12px',
      }}
    >
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={10}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Logout" to="/login" />
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
}))
