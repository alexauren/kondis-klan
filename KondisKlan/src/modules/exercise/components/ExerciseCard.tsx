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

//interface
interface ExerciseCard {
  exercise: Exercise
}

//component
export function ExerciseCard({ exercise }: ExerciseCard) {
  const { name, ...attributes } = exercise
  const { classes } = useStyles()

  const attribute = (label: string, value: number | undefined) => (
    <Group position="apart">
      <Badge variant="light">{label}</Badge>
      <Text size="md" color="white" weight={500}>
        {value}
      </Text>
    </Group>
  )

  return (
    <Card radius="lg" shadow={'xs'} withBorder p="lg" className={classes.card}>
      <Text align={'center'} size="sm" weight={700}>
        {exercise.name}
      </Text>

      <SimpleGrid cols={1}>
        {attribute('Reps', exercise.reps)}
        {attribute('Sett', exercise.sets)}
        {attribute('Vekt', exercise.weight)}
        {exercise.duration && attribute('Varighet', exercise.duration)}
      </SimpleGrid>
    </Card>
  )
}

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colors[theme.primaryColor][3],
    border: '1px solid ',
    borderColor: theme.colors[theme.primaryColor][4],
  },
}))
