import { addDoc, collection } from '@firebase/firestore'
import { Button, Group, NumberInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { db } from 'containers/Root'
import { Exercise } from '../../exercise/types'

export function generateExercise(values: any) {
  const exercise: Exercise = {
    name: values.name,
    reps: values.reps,
    sets: values.sets,
    weight: values.weight,
    duration: values.duration,
  }
  return exercise
}

export function ExerciseForm(props: any) {
  const form = useForm({
    initialValues: {
      name: '',
      reps: undefined,
      sets: undefined,
      weight: undefined,
      duration: undefined,
    },

    validate(values) {
      const errors: any = {}

      if (!values.name) {
        errors.name = 'name is required'
      }

      return errors
    },
  })

  const exerciseList: Exercise[] = []

  const handleClick = () => {
    props.setExerciseList(exerciseList)
    props.setOpened(false)
  }

  return (
    <form
      onSubmit={form.onSubmit(values => {
        const exercise = generateExercise(values)
        exerciseList.push(exercise)
        form.reset()
        alert('Exercise has been added!')
      })}
    >
      <Stack>
        <TextInput placeholder="Name" {...form.getInputProps('name')} />
        <NumberInput placeholder="Reps" {...form.getInputProps('reps')} />
        <NumberInput placeholder="Sets" {...form.getInputProps('sets')} />
        <NumberInput placeholder="Weight" {...form.getInputProps('weight')} />
        <NumberInput
          placeholder="Duration"
          {...form.getInputProps('Duration')}
        />
        <Group position="right">
          <Button type="submit" variant="outline">
            Add exercise
          </Button>
          <Button onClick={handleClick}>Done</Button>
        </Group>
      </Stack>
    </form>
  )
}
