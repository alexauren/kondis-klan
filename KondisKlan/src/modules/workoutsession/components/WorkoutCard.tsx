import {
  Text,
  Container,
  Title,
  SimpleGrid,
  Card,
  Skeleton,
  Button,
  createStyles,
  Group,
} from '@mantine/core'
import { Exercise } from 'modules/exercise/types'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import {
  WorkoutSession,
  WorkoutSessionDocument,
  WorkoutSessionWithTimestamp,
} from 'modules/workoutsession/types'
import { useExerciseCollection } from 'firebase/queries/exerciseQueries'
import { FullContentLoader } from 'components/FullContentLoader'
import { EmptyLoader } from 'components/EmptyLoader'
import { format } from 'date-fns'
import { SendWorkoutToCompleted } from 'firebase/queries/workoutSessionQueries'
import { Timestamp } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'

//interface
interface WorkoutCard {
  workoutsession: WorkoutSessionWithTimestamp
}

//component
export function WorkoutCard({ workoutsession }: WorkoutCard) {
  const { data, error, loading } = useExerciseCollection(workoutsession.id)
  //const { data: userData, userLoading, userError } = useUser(workoutsession.createdBy)
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

  function handleComplete() {
    const completedBy = 'gMYiPS1rkcQQndaN2X371LXqxyc2'
    const completedAt = new Date()
    SendWorkoutToCompleted({
      workout: workoutsession,
      completedAt,
      completedBy,
    })
  }

  const exercises2 = data as Exercise[]

  const createdAtToString = format(
    workoutsession.createdAt.toDate(),
    'dd.MM.yyyy'
  )

  console.log(workoutsession)

  return (
    <Card shadow={'sm'} className={classes.card}>
      <Title color={'kondisGreen.0'} transform="uppercase" order={3}>
        {workoutsession.title}
      </Title>

      <Text>
        <Text>Lagd av: {workoutsession.createdBy}</Text>
        <Text color={'kondisGreen.7'}>Opprettet: {createdAtToString}</Text>
      </Text>
      <SimpleGrid
        cols={3}
        spacing="xl"
        my="md"
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {exercises2.map(exercise => (
          <ExerciseCard key={exercise.name} exercise={exercise} />
        ))}
      </SimpleGrid>
      <Group position="right">
        <Button variant={'light'} onClick={handleComplete}>
          Gjennomfør
        </Button>
      </Group>
    </Card>
    // </Container>
  )
}

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    backgroundColor: theme.colors[theme.primaryColor][4],
    border: '1px solid ',
    borderColor: theme.colors[theme.primaryColor][5],
    color: theme.white,
  },
}))
