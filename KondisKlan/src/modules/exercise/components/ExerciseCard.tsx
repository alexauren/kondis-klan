import {
  Card,
  Image,
  Text,
  Group,
  Stack,
  createStyles,
  SimpleGrid,
  Badge,
} from '@mantine/core'
import { Exercise } from '../types'
import { determineExerciseType } from '../util'

//interface
interface ExerciseCard {
  exercise: Exercise
}

//component
export function ExerciseCard({ exercise }: ExerciseCard) {
  const exerciseDetermined = determineExerciseType(exercise)
  const { classes } = useStyles()

  const attribute = (label: string, value: number | undefined) => (
    <Group position="apart">
      <Badge variant="light">{label}</Badge>
      <Text size="md" weight={'bold'} color="white">
        {value}
      </Text>
    </Group>
  )

  const conditioningExercise = (
    <SimpleGrid cols={1}>
      {attribute('Varighet', exercise.duration)}
      {attribute('Sett', exercise.sets)}
    </SimpleGrid>
  )

  const strengthExercise = (
    <SimpleGrid cols={1}>
      {attribute('Reps', exercise.reps)}
      {attribute('Sett', exercise.sets)}
      {attribute('Vekt', exercise.weight)}
      {exercise.duration && attribute('Varighet', exercise.duration)}
    </SimpleGrid>
  )

  return (
    <Card radius="lg" shadow={'sm'} withBorder p="lg" className={classes.card}>
      <Text
        mb="sm"
        color={'kondisGreen.6'}
        transform={'uppercase'}
        align={'center'}
        size="sm"
        weight={700}
      >
        {exercise.name}
      </Text>

      {exerciseDetermined.type === 'conditioning'
        ? conditioningExercise
        : strengthExercise}
    </Card>
  )
}

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colors[theme.primaryColor][3],
    border: '1px solid ',
    borderColor: theme.colors[theme.primaryColor][3],
  },
}))
