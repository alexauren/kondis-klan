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
  useMantineTheme,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { db } from 'containers/Root'
import { addExerciseDocument } from 'firebase/queries/exerciseQueries'
import { addWorkoutSession } from 'firebase/queries/workoutSessionQueries'
import { ExerciseCard } from 'modules/exercise/components/ExerciseCard'
import { Exercise } from 'modules/exercise/types'
import { ExerciseForm } from 'modules/exercise/form/ExerciseForm'
import { WorkoutSession } from 'modules/workoutsession/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import FullPageError from 'components/FullPageError'
import { FullContentLoader } from 'components/FullContentLoader'

export function NewProgram() {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const auth = getAuth()
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exerciseList, setExerciseList] = useState<Exercise[]>([])
  const [date, setDate] = useState<Date | null>(null)
  const [user, loading, error] = useAuthState(auth)

  if (error) return <FullPageError />

  if (loading || !user) return <FullContentLoader />

  const uid = user.uid

  const form = useForm<WorkoutSession>({
    initialValues: { title: '', createdBy: '', createdAt: '' },
    validate: {
      title: value =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
    },
  })

  function handleSubmit(values: WorkoutSession) {
    {
      date ? (values.createdAt = date) : null
    }
    setIsSubmitting(true)
    values.createdBy = uid

    addWorkoutSession(values)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
        exerciseList.forEach(exercise => {
          addExerciseDocument(docRef.id, exercise)
        })
      })
      .then(() => {
        showNotification({
          title: 'Programmet ble opprettet',
          message: 'Du kan nå se programmet i programoversikten',
          color: 'teal',
        })
        navigate('/')
      })
  }

  function handleNextStep() {
    //console.log('active: ' + active)
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
      if (form.values.title) {
        setActive(active + 1)
      }
    }
  }

  function handlePreviousStep() {
    if (active > 0) {
      setActive(active - 1)
    }
  }
  return (
    <>
      <Card withBorder shadow={'sm'}>
        <Title order={2}>Opprett økt</Title>
        <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            mt="md"
          >
            <Stepper.Step label="Steg 1" description="Opprett et nytt program">
              <TextInput
                withAsterisk
                label="Tittel"
                placeholder="Push, Pull, Legs"
                {...form.getInputProps('title')}
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
              <SimpleGrid
                mt={'sm'}
                cols={2}
                breakpoints={[{ maxWidth: theme.breakpoints.sm, cols: 1 }]}
              >
                {exerciseList.map((exercise, index) => (
                  <ExerciseCard key={index} exercise={exercise} />
                ))}
              </SimpleGrid>
            </Stepper.Step>
            <Stepper.Completed>
              Ferdig, klikk for å legge til økten!
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
              disabled={isSubmitting}
            >
              {active === 2 ? 'Finish' : 'Next'}
            </Button>
          </Group>
        </form>
      </Card>
    </>
  )
}
