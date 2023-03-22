import {
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { EmptyLoader } from 'components/EmptyLoader'
import FullPageError from 'components/FullPageError'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import {
  addCompletedExerciseDocument,
  addRmMax,
  useExerciseCollection,
} from 'firebase/queries/exerciseQueries'
import { useUserDocument } from 'firebase/queries/userQueries'
import { SendWorkoutToCompleted } from 'firebase/queries/workoutSessionQueries'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { Exercise } from 'modules/exercise/types'
import { UserType } from 'modules/user/types'
import { UserContext } from 'modules/user/UserAuthContext'
import { WorkoutSessionWithTimestamp } from 'modules/workoutsession/types'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

//interface
interface WorkoutCard {
  workoutsession: WorkoutSessionWithTimestamp
  onCompleteCallback: () => void
}

//component
export function WorkoutCard({
  workoutsession,
  onCompleteCallback,
}: WorkoutCard) {
  const { data, error, loading } = useExerciseCollection(workoutsession.id)
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useUserDocument(workoutsession.createdBy)
  const loggedInUser = useContext(UserContext)

  //const { data: userData, userLoading, userError } = useUser(workoutsession.createdBy)
  const { classes } = useStyles()

  if (loading || userLoading) {
    return <EmptyLoader />
  }

  if (error || userError || !data || !userData) return <FullPageError />

  const exerciseList = data as Exercise[]
  const user = userData as UserType

  const createdAtToString = format(
    workoutsession.createdAt.toDate(),
    'dd.MM.yyyy'
  )

  const tags = workoutsession.tags?.map(tag => {
    return (
      <Badge
        variant="gradient"
        gradient={{ from: 'kondisGreen.5', to: 'kondisGreen.4' }}
      >
        {tag}
      </Badge>
    )
  })

  function handleComplete() {
    onCompleteCallback()
    const completedBy = loggedInUser.uid
    const completedAt = Timestamp.fromDate(new Date())
    SendWorkoutToCompleted({
      workout: workoutsession,
      completedAt,
      completedBy,
    })
      .then(docRef => {
        exerciseList.forEach(exercise => {
          addCompletedExerciseDocument(docRef.id, exercise)
          //if exercise has weight, add to rmMax
          if (exercise.weight) {
            addRmMax(completedBy, exercise, completedAt)
          }
        })
      })
      .then(() => {
        showNotification({
          title: 'Programmet ble gjennomført',
          message: 'Du kan nå se programmet i programoversikten',
          color: 'teal',
        })
      })
  }

  return (
    <Card radius={'lg'} shadow={'sm'} className={classes.card}>
      <Stack align={'center'}>
        <Title color={'kondisGreen.8'} transform="uppercase" order={3}>
          {workoutsession.title}
        </Title>
        <Group>
          {tags?.length ? tags : <Badge variant="outline">Ingen tags</Badge>}
        </Group>
        <Text align="center">
          <Text
            component={Link}
            to={'/profile/' + user.uid}
            size={'md'}
            color={'kondisGreen.6'}
          >
            Lagd av: {user.name}
          </Text>
          <Text color={'kondisGreen.8'}>Opprettet: {createdAtToString}</Text>
        </Text>
      </Stack>
      <SimpleGrid
        cols={3}
        spacing="xl"
        my="md"
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {exerciseList.map(exercise => (
          <ExerciseCard key={exercise.name} exercise={exercise} />
        ))}
      </SimpleGrid>
      <Group position="right">
        <Button variant={'filled'} onClick={handleComplete}>
          Gjennomfør
        </Button>
      </Group>
    </Card>
  )
}

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    backgroundColor: theme.colors[theme.primaryColor][1],
    border: '2px solid ',
    borderColor: theme.colors[theme.primaryColor][5],
    color: theme.white,
  },
}))
