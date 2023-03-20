import { addDoc, collection } from '@firebase/firestore'
import {
  Button,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  TextInput,
  Select,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { db } from 'containers/Root'
import { doc } from 'firebase/firestore'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { determineExerciseType } from 'modules/exercise/util'
import { useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Exercise } from '../types'
import { addExercise } from 'firebase/queries/exerciseQueries'

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

  const [exercisesFromDB, loading, error] = useDocumentData(
    doc(db, 'exercises', 'kbbjPMMnikSyEdFrZaTf')
  )
  const exerciseData = exercisesFromDB?.exercises
  if (loading) {
    return <FullContentLoader />
  }
  if (error) {
    return <FullPageError />
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
        <Select
          //Legg til label ved behov.
          data={exerciseData}
          placeholder="Skriv inn navnet på øvelsen."
          nothingFound="Finner ikke øvelsen."
          searchable
          creatable
          getCreateLabel={exercise => `+ Legg til ${exercise}`}
          onChange={exercise => {
            exercise = exercise as string
            console.log(exercise)
            form.setFieldValue('name', exercise)
            addExercise(exercise)
          }}
        />
        <NumberInput
          placeholder="Repetisjoner"
          {...form.getInputProps('reps')}
        />
        <NumberInput placeholder="Sett" {...form.getInputProps('sets')} />
        <NumberInput placeholder="vekt" {...form.getInputProps('weight')} />
        <NumberInput
          placeholder="Varighet"
          {...form.getInputProps('duration')}
        />
        <Group position="right">
          <Button
            onClick={() => handleAddExercise(form.values)}
            variant="filled"
          >
            Legg til øvelse
          </Button>
          <Button variant="outline" onClick={handleClick}>
            Fullfør
          </Button>
        </Group>
      </Stack>
      <SimpleGrid cols={1}>{exerciseCards}</SimpleGrid>
    </Group>
  )
}
