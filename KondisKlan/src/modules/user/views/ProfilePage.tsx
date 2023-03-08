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
  Checkbox,
} from '@mantine/core'
import { IconAt, IconBuilding, IconPhoneCall } from '@tabler/icons-react'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { db } from 'containers/Root'
import { collection, doc } from 'firebase/firestore'
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { updateUserVisibility } from 'firebase/queries/userQueries'
import { useState } from 'react'

function UserDetail() {
  const { classes } = useStyles()
  const { userId } = useParams() as { userId: string }
  const userRef = doc(db, 'users', userId)
  const [value, loading, error] = useDocumentData(userRef)
  const user = value
  //True needs to be changed to reflect the actual settings
  const [isChecked, setIsChecked] = useState(true)
  if (loading) {
    return <FullContentLoader />
  }
  if (error) {
    return <FullPageError />
  }

  return (
    <div className={classes.detailsWrapper}>
      <Container mt={'lg'} size={700}>
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
              <Checkbox
                checked={user.public}
                onClick={() => {
                  setIsChecked(!isChecked)
                }}
                onChange={() => {
                  updateUserVisibility(userId, isChecked)
                }}
                label="I want my profile to be public"
              />
            </div>
          )}
        </Paper>
      </Container>
    </div>
  )
}

export default UserDetail

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
