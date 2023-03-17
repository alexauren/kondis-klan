import {
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Stack,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core'
import { EmptyLoader } from 'components/EmptyLoader'
import {
  addCompletedExerciseDocument,
  addExerciseDocument,
  useExerciseCollection,
} from 'firebase/queries/exerciseQueries'
import { SendWorkoutToCompleted } from 'firebase/queries/workoutSessionQueries'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { Exercise } from 'modules/exercise/types'
import { WorkoutSessionWithTimestamp } from 'modules/workoutsession/types'
import { showNotification } from '@mantine/notifications'
import { useUserDocument } from 'firebase/queries/userQueries'
import FullPageError from 'components/FullPageError'
import { UserType } from 'modules/user/types'
import { format } from 'date-fns'

//interface
interface WorkoutCard {
  workoutsession: WorkoutSessionWithTimestamp
}

//component
export function WorkoutCard({ workoutsession }: WorkoutCard) {
  const { data, error, loading } = useExerciseCollection(workoutsession.id)
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useUserDocument(workoutsession.createdBy)
  //const { data: userData, userLoading, userError } = useUser(workoutsession.createdBy)
  const { classes } = useStyles()
  if (loading || userLoading) {
    return <EmptyLoader />
  }

  if (error || userError) return <FullPageError />

  const exerciseList = data as Exercise[]
  const user = userData as UserType

  const createdAtToString = format(
    workoutsession.createdAt.toDate(),
    'dd.MM.yyyy'
  )

  function handleComplete() {
    const completedBy = user.uid
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

  const exercises2 = data as Exercise[]

  // const createdAtToString = format(
  //   workoutsession.createdAt.toDate(),
  //   'dd.MM.yyyy'
  // )

  console.log(workoutsession)

  console.log(workoutsession)

  return (
    <Card radius={'lg'} shadow={'sm'} className={classes.card}>
      <Stack align={'center'}>
        <Title color={'kondisGreen.8'} transform="uppercase" order={3}>
          {workoutsession.title}
        </Title>
        <div>
          {workoutsession.tags?.map((tag, index) => (
            <Badge color="pink" variant="filled">
              {workoutsession.tags?.[index]}
            </Badge>
          ))}
        </div>

        <Text align="center">
          <Text size={'md'} color={'kondisGreen.6'}>
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
    // </Container>
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
