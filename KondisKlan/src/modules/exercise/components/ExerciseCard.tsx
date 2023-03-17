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

  const items = Object.entries(attributes).map(attribute => (
    <Group position="apart" key={attribute[0]}>
      <Badge variant="light">{attribute[0]}</Badge>
      <Text size="md" color="white" weight={500}>
        {attribute[1]}
      </Text>
    </Group>
  ))

  return (
    <Card radius="lg" shadow={'xs'} withBorder p="lg" className={classes.card}>
      <Text align={'center'} size="sm" weight={700}>
        {exercise.name}
      </Text>

      <SimpleGrid cols={1}>{items}</SimpleGrid>
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
