import {
  Checkbox,
  Container,
  createStyles,
  Divider,
  Group,
  MultiSelect,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { db } from 'containers/Root'
import { doc } from 'firebase/firestore'
import {
  setUserInterests,
  updateTagsCollection,
  updateUserVisibility,
} from 'firebase/queries/userQueries'
import { useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { MyCompletedWorkouts } from '../components/MyCompletedWorkouts'
import { MyWorkouts } from '../components/MyWorkouts'

function UserDetail() {
  const { classes } = useStyles()
  const { userId } = useParams() as { userId: string }
  const userRef = doc(db, 'users', userId)
  const [data, loading, error] = useDocumentData(userRef)
  const [tagsFromDB, loadingTags, errorTags] = useDocumentData(
    doc(db, 'tags', 'ZP3S5zqtbEnjYZRvKMxB')
  )
  const tagList = tagsFromDB?.tags
  //True needs to be changed to reflect the actual settings
  const [isChecked, setIsChecked] = useState(true)

  if (loading || loadingTags) {
    return <FullContentLoader />
  }
  if (error || errorTags) {
    return <FullPageError />
  }

  const user = data

  return (
    <Stack justify="flex-start">
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
                label="Jeg vil at profilen min skal være offentlig"
              />
              <MultiSelect
                label="Mine interesser"
                data={tagList} //replace with all tags
                placeholder="Velg interesser"
                nothingFound="Ingen funnet"
                searchable
                multiple
                creatable
                getCreateLabel={tags => `+ Legg til ${tags}`}
                onChange={tags => {
                  // set of strings
                  setUserInterests(userId, tags)
                  updateTagsCollection(tags)
                  console.log(tags)
                  return tags
                }}
              />
            </div>
          )}
        </Paper>
      </Container>
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
