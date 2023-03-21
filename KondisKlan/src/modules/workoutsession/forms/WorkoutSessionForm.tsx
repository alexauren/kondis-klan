import { addDoc, collection } from '@firebase/firestore'
import { Button, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { db } from 'containers/Root'
import { WorkoutSession } from '../types'

// Async betyr at funksjonen venter på svar fra databasen før den fortsetter
// db er firebase databasen
// addDoc er en funksjon fra firebase som legger til en dokument i databasen
// Values: du sir at typen av value MÅ være WorkoutSession

export const submitWorkout = async (values: WorkoutSession) => {
  const workout = collection(db, 'workoutsessions')
  await addDoc(workout, values)
}

export function WorkoutSessionForm() {
  const form = useForm({
    initialValues: {
      title: '',
      createdAt: '',
      createdBy: '',
      tags: [],
    },

    validate(values) {
      const errors: any = {}

      if (!values.title) {
        errors.title = 'title is required'
      }

      if (!values.createdAt) {
        errors.reps = 'Created at is required'
      }

      if (!values.createdBy) {
        errors.sets = 'Created by is required'
      }

      return errors
    },
  })

  return (
    <form onSubmit={form.onSubmit(values => submitWorkout(values))}>
      <Stack>
        <TextInput placeholder="title" {...form.getInputProps('title')} />
        <TextInput
          placeholder="Created at"
          {...form.getInputProps('createdAt')}
        />
        <TextInput
          placeholder="Created by"
          {...form.getInputProps('createdBy')}
        />
        <Group position="right">
          <Button type="submit" variant="outline" color="orange">
            Add workout
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
