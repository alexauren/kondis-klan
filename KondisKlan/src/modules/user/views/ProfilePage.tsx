import {
  Checkbox,
  Container,
  createStyles,
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
import TagView from './Tags'

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
        <Title weight={'bold'} order={2} className={classes.title} mb="md">
          Profil
        </Title>
        <TagView />
        <Paper shadow={'sm'} p={'lg'} className={classes.paper}>
          {user && (
            <div className={classes.detailsCard}>
              <Group mt="sm" position="apart">
                <div>
                  <Space h={'xs'} />
                  <Text className={classes.name}>{user.name}</Text>
                  <Group noWrap spacing={10} mt={3}>
                    <IconAt />
                    <Text size="sm">{user.email}</Text>
                  </Group>
                </div>
              </Group>
              <Checkbox
                my="sm"
                classNames={{
                  body: classes.checkBox,
                  input: classes.checkBoxInput,
                }}
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
    backgroundColor: theme.colors[theme.primaryColor][3],
    padding: theme.spacing.xl,
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
    fontSize: theme.fontSizes.lg * 1.25,
  },
  role: {
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.lg,
  },
}))
