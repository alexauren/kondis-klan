import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  setDoc,
} from '@firebase/firestore'
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
import {
  WorkoutSession,
  workoutSessionConverter,
} from 'modules/workoutsession/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { MultiSelect } from '@mantine/core'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import {
  setUserInterests,
  updateUserVisibility,
  updateTagsCollection,
} from 'firebase/queries/userQueries'

export function NewProgram() {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exerciseList, setExerciseList] = useState<Exercise[]>([])
  const [date, setDate] = useState<Date | null>(null)

  const [tagsFromDB, loadingTags, errorTags] = useDocumentData(
    doc(db, 'tags', 'ZP3S5zqtbEnjYZRvKMxB')
  )
  const tagList = tagsFromDB?.tags

  const form = useForm<WorkoutSession>({
    initialValues: { title: '', createdBy: '', createdAt: '', tags: [] },
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

    setIsSubmitting(true)

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
            <Stepper.Step label="Third step" description="Choose tags">
              <MultiSelect
                label="Mine tags"
                data={tagList} //replace with all tags
                placeholder="Velg tags"
                nothingFound="Ingen funnet"
                value={form.values.tags}
                searchable
                multiple
                creatable
                getCreateLabel={tags => `+ Legg til ${tags}`}
                onChange={tags => {
                  updateTagsCollection(tags)
                  form.setFieldValue('tags', tags)
                  console.log(tags)
                  return tags
                }}
              />
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
