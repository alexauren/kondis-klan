import {
  Text,
  Container,
  Title,
  SimpleGrid,
  Card,
  Skeleton,
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

//interface
interface WorkoutCard {
  workoutsession: WorkoutSessionWithTimestamp
}

//component
export function WorkoutCard({ workoutsession }: WorkoutCard) {
  const { data, error, loading } = useExerciseCollection(workoutsession.id)

  if (loading) {
    return <EmptyLoader />
  }

  if (error) {
    return <span>Error</span>
  }

  if (!data) {
    return <div>Not found</div>
  }

  const exercises2 = data as Exercise[]

  const createdAtToString = format(
    workoutsession.createdAt.toDate(),
    'dd.MM.yyyy'
  )

  return (
    <Card withBorder shadow={'sm'}>
      <Title order={3}>{workoutsession.title}</Title>

      <Text>
        <Text>Lagd av: {workoutsession.createdBy}</Text>
        <Text>Den {createdAtToString}</Text>
      </Text>
      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {exercises2.map(exercise => (
          <ExerciseCard key={exercise.name} exercise={exercise} />
        ))}
      </SimpleGrid>
    </Card>
    // </Container>
  )
}
