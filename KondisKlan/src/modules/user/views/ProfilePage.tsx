import {
  Card,
  createStyles,
  Group,
  Paper,
  Text,
  Image,
  Stack,
  Title,
  Badge,
  Divider,
  Avatar,
  Container,
  Space,
  List,
  ThemeIcon,
  SimpleGrid,
} from '@mantine/core'
import { IconAt, IconBuilding, IconPhoneCall } from '@tabler/icons-react'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { db } from 'containers/Root'
import { collection, doc } from 'firebase/firestore'
import { WorkoutSessionFeed } from 'modules/workoutsession/components/WorkoutSessionFeed'
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { MyCompletedWorkouts } from '../components/MyCompletedWorkouts'
import { MyWorkouts } from '../components/MyWorkouts'

const useStyles = createStyles(theme => ({
  detailsWrapper: {
    padding: '0px',
    margin: '0px',
  },
  detailsCard: {
    color: 'black',
  },
  paper: {
    padding: theme.spacing.xl,
    borderTop: `4px solid ${theme.colors.teal[7]}`,
  },
  title: {
    color: theme.colors.gray[7],
    fontWeight: 300,
    textTransform: 'uppercase',
  },
  profileImage: {
    width: 300,
    height: 200,
  },
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 500,
    fontSize: theme.fontSizes.lg * 1.25,
  },
  role: {
    color: theme.colors.gray[6],
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.lg,
  },
  list: {
    color: theme.colors.gray[6],
  },
}))

function UserDetail() {
  const { classes } = useStyles()
  const { userId } = useParams() as { userId: string }
  const userRef = doc(db, 'users', userId)
  const [value, loading, error] = useDocumentData(userRef)
  if (loading) {
    return <FullContentLoader />
  }
  if (error) {
    return <FullPageError />
  }

  const user = value

  return (
    <Stack justify="flex-start">
      <div>
        <Title order={2} className={classes.title} mb="md">
          Profil
        </Title>
        <Paper shadow={'sm'} p={'lg'} className={classes.paper}>
          {user && (
            <div className={classes.detailsCard}>
              <Group position="apart">
                <div>
                  <Space h={'xs'} />
                  <Text className={classes.name}>{user.name}</Text>
                  <Divider my={'sm'} />
                  <Group noWrap spacing={10} mt={3}>
                    <IconAt />
                    <Text size="sm" color="dimmed">
                      {user.email}
                    </Text>
                  </Group>
                </div>
              </Group>
            </div>
          )}
        </Paper>
      </div>
      <SimpleGrid cols={2}>
        <Stack>
          <Title> My Workouts </Title>
          <MyWorkouts userId={userId} />
        </Stack>
        <Stack>
          <Title> Completed Workouts</Title>
          <MyCompletedWorkouts userId={userId} />
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}

export default UserDetail
