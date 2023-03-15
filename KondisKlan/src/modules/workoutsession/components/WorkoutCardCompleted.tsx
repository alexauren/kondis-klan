import {
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
import { format } from 'date-fns'
import {
  addCompletedExerciseDocument,
  useCompletedExerciseCollection,
  useExerciseCollection,
} from 'firebase/queries/exerciseQueries'
import { SendWorkoutToCompleted } from 'firebase/queries/workoutSessionQueries'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { Exercise } from 'modules/exercise/types'
import { WorkoutSessionComplete } from 'modules/workoutsession/types'

//interface
interface WorkoutCard {
  workoutsession: WorkoutSessionComplete
}

//component
export function WorkoutCardCompleted({ workoutsession }: WorkoutCard) {
  const { data, error, loading } = useCompletedExerciseCollection(
    workoutsession.id
  )
  const { classes } = useStyles()

  if (loading) {
    return <EmptyLoader />
  }

  if (error) {
    return <span>Error</span>
  }

  if (!data) {
    return <div>Not found</div>
  }

  const exerciseList = data as Exercise[]

  const createdAtToString = format(
    workoutsession.createdAt.toDate(),
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
          <Text size={'md'} color={'kondisGreen.2'}>
            Lagd av: {workoutsession.createdBy}
          </Text>
          <Text color={'kondisGreen.0'}>Opprettet: {createdAtToString}</Text>
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
