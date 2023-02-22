import { addDoc, collection } from '@firebase/firestore'
import {
  Button,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { db } from 'containers/Root'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { determineExerciseType } from 'modules/exercise/util'
import { useState } from 'react'
import { Exercise } from '../../exercise/types'

interface ExerciseFormProps {
  setExerciseListCallback: (exerciseList: Exercise[]) => void
  exerciseList: Exercise[]
  setOpened: (opened: boolean) => void
}

export function ExerciseForm({
  setExerciseListCallback,
  setOpened,
  exerciseList,
}: ExerciseFormProps) {
  const form = useForm<Exercise>({
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

  const handleClick = () => {
    setOpened(false)
  }

  function handleAddExercise(values: Exercise) {
    const exercise = determineExerciseType(values)
    console.log(exercise)
    exerciseList.push(exercise)
    form.reset()
    setExerciseListCallback(exerciseList)
  }

  const exerciseCards = exerciseList.map((exercise, index) => (
    <ExerciseCard key={index} exercise={exercise} />
  ))

  return (
    <Group>
      <Stack justify={'flex-start'}>
        <TextInput placeholder="Name" {...form.getInputProps('name')} />
        <NumberInput placeholder="Reps" {...form.getInputProps('reps')} />
        <NumberInput placeholder="Sets" {...form.getInputProps('sets')} />
        <NumberInput placeholder="Weight" {...form.getInputProps('weight')} />
        <NumberInput
          placeholder="Duration"
          {...form.getInputProps('duration')}
        />
        <Group position="right">
          <Button
            onClick={() => handleAddExercise(form.values)}
            variant="outline"
          >
            Add exercise
          </Button>
          <Button onClick={handleClick}>Done</Button>
        </Group>
      </Stack>
      <SimpleGrid cols={1}>{exerciseCards}</SimpleGrid>
    </Group>
  )
}
