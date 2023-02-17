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
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "assets/logo.png";
import NavBar from "modules/landing/navbar/NavBar";
import { useMobile } from "util/hooks";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useMantineTheme();
  const [sidebarOpen, toggleSidebar] = useState(false);
  const isMobile = useMobile();
  const { classes } = useStyles();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors["kondisGreen"],
        },
      }}
      navbar={<NavBar isHidden={isMobile  ? sidebarOpen : false} />}
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="xs" styles={{ display: "none" }}>
              <Burger
                opened={sidebarOpen}
                onClick={() => toggleSidebar (!sidebarOpen)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group className={classes.header}>
                <Group>
                    <Image src={Logo} width={48} height={48} />
                    <Text component={Link} to="/" weight={300} size="lg">
                      KondisKlan
                    </Text>
                </Group>
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default MainLayout;

const useStyles = createStyles((t) => ({
  header: {
    width: "100%",
    justifyContent: "space-between",
    [`@media (max-width: ${t.breakpoints.xs}px)`]: {
      flexDirection: "row-reverse",
    },
  },
}));
