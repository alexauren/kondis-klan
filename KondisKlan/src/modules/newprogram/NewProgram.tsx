import { addDoc, collection } from '@firebase/firestore'
import {
  Button,
  Card,
  Group,
  Modal,
  SimpleGrid,
  Stepper,
  TextInput,
  Title,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { db } from 'containers/Root'
import { addExerciseDocument } from 'firebase/queries/exerciseQueries'
import { addWorkoutSession } from 'firebase/queries/workoutSessionQueries'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { Exercise } from 'modules/exercise/types'
import { ExerciseForm } from 'modules/workoutsession/forms/ExerciseForm'
import { WorkoutSession } from 'modules/workoutsession/types'
import { useEffect, useState } from 'react'

export function NewProgram() {
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [exerciseList, setExerciseList] = useState<Exercise[]>([])
  const [date, setDate] = useState<Date | null>(null)

  const form = useForm<WorkoutSession>({
    initialValues: { title: '', createdBy: '', createdAt: '' },
    validate: {
      title: value =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      createdBy: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  function handleSubmit(values: WorkoutSession) {
    {
      date ? (values.createdAt = date) : null
    }

    addWorkoutSession(values).then(function (docRef) {
      console.log('Document written with ID: ', docRef.id)
      exerciseList.forEach(exercise => {
        addExerciseDocument(docRef.id, exercise)
      })
    })
  }

  function handleNextStep() {
    console.log('active: ' + active)
    if (active === 2) {
      handleSubmit(form.values)
    }
    if (active === 1) {
      //validate that exercises are chosen
      if (exerciseList.length > 0) {
        setActive(active + 1)
      }
    }

    if (active === 0) {
      //validate that title and createdBy is filled out
      if (form.values.title && form.values.createdBy) {
        setActive(active + 1)
      }
    }
  }

  function handlePreviousStep() {
    if (active > 0) {
      setActive(active - 1)
    }
  }

  useEffect(() => {
    setIsValid(Object.keys(form.errors).length === 0)
  }, [form.errors])

  return (
    <>
      <Card withBorder shadow={'sm'}>
        <Title> New Program</Title>
        <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            mt="md"
          >
            <Stepper.Step
              label="First step"
              description="Opprett et nytt program"
            >
              <TextInput
                withAsterisk
                label="Tittel"
                placeholder="Push, Pull, Legs"
                {...form.getInputProps('title')}
              />
              <TextInput
                mt="sm"
                label="Laget av (skal fjernes)"
                placeholder="john@smith.com"
                {...form.getInputProps('createdBy')}
              />
              <DatePicker
                label="Created date"
                placeholder="Choose date"
                value={date}
                onChange={setDate}
              />
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
                size={'lg'}
                opened={opened}
                onClose={() => setOpened(false)}
              >
                <ExerciseForm
                  exerciseList={exerciseList}
                  setExerciseListCallback={setExerciseList}
                  setOpened={setOpened}
                />
              </Modal>
              <SimpleGrid cols={2}>
                {exerciseList.map((exercise, index) => (
                  <ExerciseCard key={index} exercise={exercise} />
                ))}
              </SimpleGrid>
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click finish to save your program.
            </Stepper.Completed>
          </Stepper>

          <Group position="center" mt="xl">
            <Button
              variant="default"
              disabled={active == 0}
              onClick={handlePreviousStep}
            >
              Back
            </Button>
            <Button
              type={active === 3 ? 'submit' : 'button'}
              onClick={handleNextStep}
              disabled={!isValid}
            >
              {active === 2 ? 'Finish' : 'Next'}
            </Button>
          </Group>
        </form>
      </Card>
    </>
  )
}
