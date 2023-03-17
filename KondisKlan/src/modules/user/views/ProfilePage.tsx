import {
  Checkbox,
  Container,
  createStyles,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconAt, IconUser } from '@tabler/icons-react'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { db } from 'containers/Root'
import { doc } from 'firebase/firestore'
import { updateUserVisibility } from 'firebase/queries/userQueries'
import { useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { MyCompletedWorkouts } from '../components/MyCompletedWorkouts'
import { MyWorkouts } from '../components/MyWorkouts'
import { UserType } from '../types'
import TagView from './Tags'

function UserDetail() {
  const { classes } = useStyles()
  const { userId } = useParams() as { userId: string }
  const userRef = doc(db, 'users', userId)
  const [value, loading, error] = useDocumentData(userRef)

  const [isChecked, setIsChecked] = useState(false)

  if (loading) {
    return <FullContentLoader />
  }
  if (error) {
    return <FullPageError />
  }
  const user = value as UserType

  return (
    <Stack justify="flex-start">
      <Container mt={'lg'}>
        <Paper shadow={'lg'} p={'lg'} radius="md" className={classes.paper}>
          {user && (
            <div className={classes.detailsCard}>
              <Group mt="sm">
                <IconUser className={classes.iconUser} stroke={1.2} size={70} />
                <div>
                  <Text color={'kondisGreen.8'} className={classes.name}>
                    {user.name}
                  </Text>
                  <Group noWrap spacing={10} mt={3}>
                    <IconAt size={18} />
                    <Text size="md">{user.email}</Text>
                  </Group>
                </div>
              </Group>
              <Divider color={'kondisGreen.4'} my="lg" />
              <TagView user={user} />
              <Checkbox
                checked={user ? user.public : false}
                onChange={() => {
                  updateUserVisibility(userId, !isChecked).then(() => {
                    showNotification({
                      title: 'Oppdatert',
                      message: 'Din synlighet er nå endret',
                      color: 'teal',
                    })
                    setIsChecked(!isChecked)
                  })
                }}
                label="Jeg vil at profilen min skal være offentlig"
              />
            </div>
          )}
        </Paper>
      </Container>
      <SimpleGrid cols={2}>
        <Stack>
          <Title order={2}> Mine Treningsøkter</Title>
          <MyWorkouts userId={userId} />
        </Stack>
        <Stack>
          <Title order={2}>Gjennomførte Treningsøkter</Title>
          <MyCompletedWorkouts userId={userId} />
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}

export default UserDetail

const useStyles = createStyles(theme => ({
  detailsWrapper: {
    padding: '0px',
    margin: '0px',
  },
  detailsCard: {},

  checkBox: {
    backgroundColor: theme.colors[theme.primaryColor][3],
  },
  checkBoxInput: {
    backgroundColor: theme.colors[theme.primaryColor][1],
  },
  paper: {
    backgroundColor: theme.colors[theme.primaryColor][1],
    padding: theme.spacing.xl,
    border: '2px solid',
    borderColor: theme.colors[theme.primaryColor][4],
    color: theme.colors[theme.primaryColor][6],
  },
  title: {
    fontWeight: 300,
    textTransform: 'uppercase',
  },
  profileImage: {
    width: 300,
    height: 200,
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 500,
    fontSize: theme.fontSizes.lg * 1.5,
  },
  role: {
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.lg,
  },
  iconUser: {
    color: theme.colors[theme.primaryColor][4],
  },
}))
