import { addDoc, collection } from '@firebase/firestore'
import {
  Button,
  Card,
  Group,
  Modal,
  Stepper,
  TextInput,
  Title,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { db } from 'containers/Root'
import { addWorkoutSession } from 'firebase/queries/workoutSessionQueries'
import { ExerciseForm } from 'modules/workoutsession/forms/ExerciseForm'
import { WorkoutSession } from 'modules/workoutsession/types'
import { useEffect, useState } from 'react'

export const submitWorkout = async (values: WorkoutSession) => {
  const workout = collection(db, 'workoutsessions')
  await addDoc(workout, values)
}

export function NewProgram() {
  const [active, setActive] = useState(0)
  const nextStep = () =>
    setActive(current => (current < 2 ? current + 1 : current))
  const prevStep = () =>
    setActive(current => (current > 0 ? current - 1 : current))
  const [opened, setOpened] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [exerciseList, setExerciseList] = useState<Exercise[]>([])

  const currentDate = new Date()
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.')

  const form = useForm<WorkoutSession>({
    initialValues: { title: '', createdBy: '', createdAt: currentDate },
    validateInputOnBlur: true,
    validate: {
      title: value =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      createdBy: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  function handleSubmit(values: WorkoutSession) {
    values.exercises = exerciseList
    submitWorkout(values)
  }

  useEffect(() => {
    setIsValid(Object.keys(form.errors).length === 0)
  }, [form.errors])

  return (
    <>
      <Card withBorder shadow={'sm'}>
        <Title> New Program</Title>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          mt="md"
        >
          <Stepper.Step label="First step" description="Create a new program">
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
              <TextInput
                withAsterisk
                label="Name of program"
                placeholder="Push, Pull, Legs"
                {...form.getInputProps('title')}
              />
              <TextInput
                mt="sm"
                label="Createdby (will be auto filled)"
                placeholder="john@smith.com"
                {...form.getInputProps('createdBy')}
              />
              {/* <DatePicker
                label="Created date"
                placeholder="Choose date"
                {...form.getInputProps('createdAt')}
              /> */}
              <Button type="submit">Submit</Button>
            </form>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Choose exercises">
            <Button
              variant="outline"
              onClick={() => {
                setOpened(true)
              }}
            >
              Choose exercises
            </Button>
            <Modal
              title="Choose exercises"
              opened={opened}
              onClose={() => setOpened(false)}
            >
              <ExerciseForm exerciseList={exerciseList} setOpened={setOpened} />
            </Modal>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click finish to save your program.
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button
            type={active === 2 ? 'submit' : 'button'}
            onClick={nextStep}
            disabled={!isValid}
          >
            {active === 2 ? 'Finish' : 'Next'}
          </Button>
        </Group>
      </Card>
    </>
  )
}
