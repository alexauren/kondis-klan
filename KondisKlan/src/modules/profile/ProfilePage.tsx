import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconUser, IconAt } from '@tabler/icons-react';


interface UserInfoIconsProps {
  avatar: string;
  name: string;
  username: string;
  email: string;
}

export default function UserInfoIcons({ avatar, name, username, email }: UserInfoIconsProps) {
  const { classes } = useStyles();
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
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },
  
    name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  }));
