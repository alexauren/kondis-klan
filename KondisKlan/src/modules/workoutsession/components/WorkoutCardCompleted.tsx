import {
  Button,
  Card,
  createStyles,
  Divider,
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
import {
  addCompletedExerciseDocument,
  useCompletedExerciseCollection,
  useExerciseCollection,
} from 'firebase/queries/exerciseQueries'
import { useUserDocument } from 'firebase/queries/userQueries'
import { SendWorkoutToCompleted } from 'firebase/queries/workoutSessionQueries'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { Exercise } from 'modules/exercise/types'
import { UserType } from 'modules/user/types'
import { WorkoutSessionComplete } from 'modules/workoutsession/types'

//interface
interface WorkoutCard {
  workoutsession: WorkoutSessionComplete
}

//component
export function WorkoutCardCompleted({ workoutsession }: WorkoutCard) {
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useUserDocument(workoutsession.completedBy)
  const {
    data: user2Data,
    error: user2Error,
    loading: user2Loading,
  } = useUserDocument(workoutsession.createdBy)
  const { data, error, loading } = useCompletedExerciseCollection(
    workoutsession.id
  )
  const { classes } = useStyles()

  if (error || userError || !data || !userData || !user2Data || user2Error)
    return <FullPageError />

  if (loading || userLoading || user2Loading) {
    return <EmptyLoader />
  }

  if (!data) {
    return <div>Not found</div>
  }

  const exerciseList = data as Exercise[]
  const userCompleted = userData as UserType
  const userCreator = user2Data as UserType

  const createdAtToString = format(
    workoutsession.createdAt.toDate(),
    'dd.MM.yyyy'
  )

  const completedAtToString = format(
    workoutsession.completedAt.toDate(),
    'dd.MM.yyyy'
  )

  function handleComplete() {
    const completedBy = 'gMYiPS1rkcQQndaN2X371LXqxyc2'
    const completedAt = new Date()
    SendWorkoutToCompleted({
      workout: workoutsession,
      completedAt,
      completedBy,
    })
      .then(docRef => {
        exerciseList.forEach(exercise => {
          addCompletedExerciseDocument(docRef.id, exercise)
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

  console.log(workoutsession)

  return (
    <Card radius="lg" shadow={'sm'} className={classes.card}>
      <Stack align={'center'}>
        <Title color={'kondisGreen.1'} transform="uppercase" order={3}>
          {workoutsession.title}
        </Title>

        <Text align="center">
          <Group>
            <div>
              <Text
                align="left"
                weight={'bold'}
                size={'md'}
                color={'kondisGreen.2'}
              >
                Gjennomført av: {userCompleted.name}
              </Text>
              <Text size={'md'} color={'kondisGreen.2'}>
                Gjennomført: {completedAtToString}
              </Text>
            </div>
            <Divider orientation="vertical" />
            <div>
              <Text
                align="left"
                weight={'bold'}
                size={'md'}
                color={'kondisGreen.7'}
              >
                Lagd av: {userCreator.name}
              </Text>
              <Text color={'kondisGreen.7'}>
                Opprettet: {createdAtToString}
              </Text>
            </div>
          </Group>
        </Text>
      </Stack>
      <SimpleGrid
        cols={3}
        spacing="lg"
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
    // </Container>
  )
}

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    backgroundColor: theme.colors[theme.primaryColor][5],
    border: '2px solid ',
    borderColor: theme.colors[theme.primaryColor][6],
    color: theme.white,
  },
}))
