import { Button, Card, SimpleGrid, Text, Title } from '@mantine/core'
import { EmptyLoader } from 'components/EmptyLoader'
import { format } from 'date-fns'
import { useExerciseCollection } from 'firebase/queries/exerciseQueries'
import { SendWorkoutToCompleted } from 'firebase/queries/workoutSessionQueries'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { Exercise } from 'modules/exercise/types'
import { WorkoutSessionWithTimestamp } from 'modules/workoutsession/types'

//interface
interface WorkoutCard {
  workoutsession: WorkoutSessionWithTimestamp
}

//component
export function WorkoutCardCompleted({ workoutsession }: WorkoutCard) {
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
      <Button onClick={handleComplete}>Gjennomfør</Button>
    </Card>
    // </Container>
  )
}
