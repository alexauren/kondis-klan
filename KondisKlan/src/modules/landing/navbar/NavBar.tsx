import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Image,
} from "@mantine/core";
import {
  Icon,
  IconHome2,
  IconUser,
  IconSettings,
  IconLogout,
  IconPlus,
} from "@tabler/icons-react";
import Logo from "../../../assets/logo.png";

interface NavbarLinkProps {
  icon: Icon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconPlus, label: "New program" },
  { icon: IconUser, label: "Account" },
  { icon: IconSettings, label: "Settings" },
];

interface NavbarMinimalProps {
  isHidden: boolean;
}

export default function NavbarMinimal({isHidden}: NavbarMinimalProps) {
  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar
      hidden={isHidden}
      p="md"
      hiddenBreakpoint="xs"
      width={{lg: 80, sm: 80, xs: 80}}
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
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));