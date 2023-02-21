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

  const form = useForm({
    //data for testing purposes
    initialValues: { name: '', email: '', Date: new Date() },
    validateInputOnBlur: true,
    validate: {
      name: value =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const session: WorkoutSession = {
    title: 'Upper Body Workout',
    createdAt: '2023-02-14',
    createdBy: 'John Doe',
    exercises: [
      { name: 'Bench Press', reps: 10, sets: 3, weight: 135 },
      { name: 'Pull-Ups', reps: 8, sets: 3 },
      { name: 'Shoulder Press', reps: 12, sets: 3, weight: 50 },
      { name: 'Planke', sets: 3, duration: 25 },
    ],
  }

  han

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
            <form>
              <TextInput
                withAsterisk
                label="Name of program"
                placeholder="Push, Pull, Legs"
                {...form.getInputProps('name')}
              />
              <TextInput
                mt="sm"
                label="Createdby (will be auto filled)"
                placeholder="john@smith.com"
                {...form.getInputProps('email')}
              />
              <DatePicker
                label="Created date"
                placeholder="Choose date"
                {...form.getInputProps('Date')}
              />
            </form>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Choose exercises">
            <Button
              variant="outline"
              onClick={() => {
                setOpened(true)
                //more functions here
                //submitWorkout(form.values)
              }}
            >
              Choose exercises
            </Button>
            <Modal
              title="Choose exercises"
              opened={opened}
              onClose={() => setOpened(false)}
            >
              <ExerciseForm />
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
            onClick={() => {
              if (active === 2) {
                addWorkoutSession(session)
                console.log(session)
              } else {
                nextStep()
              }
            }}
            disabled={!isValid}
          >
            {active === 2 ? 'Finish' : 'Next'}
          </Button>
        </Group>
      </Card>
    </>
  )
}
