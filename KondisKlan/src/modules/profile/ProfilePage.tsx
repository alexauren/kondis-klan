import { createStyles, Avatar, Text, Group } from "@mantine/core";
import { IconUser, IconAt } from "@tabler/icons-react";

export default function UserInfo() {
  const { classes } = useStyles();
  
  //Sett inn logikk for å hente ut brukerinfo fra databasen her.
  var avatar = "";
  var name = "";
  var email = "";
  var username = "";

  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text size="lg" weight={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconUser stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {username}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
