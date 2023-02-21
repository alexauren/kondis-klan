import { Text, Container, Title, SimpleGrid, Card } from '@mantine/core'
import { Exercise } from 'modules/exercise/types'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import {
  WorkoutSession,
  WorkoutSessionDocument,
} from 'modules/workoutsession/types'
import { useExerciseCollection } from 'firebase/queries/exerciseQueries'

//interface
interface WorkoutCard {
  workoutsession: WorkoutSessionDocument
  exercises: Exercise[]
}

//component
export function WorkoutCard({ workoutsession, exercises }: WorkoutCard) {
  const { data, error, loading } = useExerciseCollection(workoutsession.id)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <span>Error</span>
  }

  if (!data) {
    return <div>Not found</div>
  }

  const exercises2 = data as Exercise[]

  return (
    // <Container size="lg">
    <Card withBorder shadow={'sm'}>
      <Title order={3}>{workoutsession.title}</Title>

      <Text>
        <Text>Lagd av: {workoutsession.createdBy}</Text>
        <Text>Den {workoutsession.createdAt}</Text>
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
