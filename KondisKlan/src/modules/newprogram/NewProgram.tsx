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
  createStyles,
  Group,
  Modal,
  SimpleGrid,
  Stepper,
  TextInput,
  Title,
  Text,
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
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import FullPageError from 'components/FullPageError'
import { FullContentLoader } from 'components/FullContentLoader'
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
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const auth = getAuth()
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exerciseList, setExerciseList] = useState<Exercise[]>([])
  const [date, setDate] = useState<Date | null>(null)

  const [tagsFromDB, loadingTags, errorTags] = useDocumentData(
    doc(db, 'tags', 'ZP3S5zqtbEnjYZRvKMxB')
  )
  const tagList = tagsFromDB?.tags
  const [user, loading, error] = useAuthState(auth)

  if (error) return <FullPageError />

  if (loading || !user) return <FullContentLoader />

  const uid = user.uid

  const form = useForm<WorkoutSession>({
    initialValues: { title: '', createdBy: '', createdAt: '', tags: [] },
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
      <Card shadow={'sm'} className={classes.card}>
        <Title order={2} color="kondisGreen.7">
          Opprett økt
        </Title>
        <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            mt="md"
            classNames={{
              separator: classes.step,
            }}
          >
            <Stepper.Step
              label="Steg 1"
              description={
                <Text color="kondisGreen.7">Opprett et nytt program</Text>
              }
            >
              <TextInput
                classNames={{
                  required: classes.required,
                  label: classes.textColorTheme,
                }}
                withAsterisk
                label={'Tittel'}
                placeholder="Overkropp, Bein, etc."
                {...form.getInputProps('title')}
              />
              <DatePicker
                classNames={{
                  required: classes.required,
                  label: classes.textColorTheme,
                }}
                label="Dato opprettet"
                placeholder="Velg dato"
                value={date}
                onChange={setDate}
              />
            </Stepper.Step>
            <Stepper.Step
              label="Steg 2"
              description={<Text color="kondisGreen.7">Legg til øvelser</Text>}
            >
              <Button
                variant="light"
                onClick={() => {
                  setOpened(true)
                }}
              >
                Legg til øvelser
              </Button>
              <Modal
                title="Legg til øvelser"
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
              Tilbake
            </Button>
            <Button
              type={active === 3 ? 'submit' : 'button'}
              onClick={handleNextStep}
              disabled={isSubmitting}
            >
              {active === 2 ? 'Fullfør' : 'Neste'}
            </Button>
          </Group>
        </form>
      </Card>
    </>
  )
}

const useStyles = createStyles(theme => ({
  card: {
    border: '2px solid',
    borderColor: theme.colors[theme.primaryColor][4],
    backgroundColor: theme.colors[theme.primaryColor][2],
    color: theme.colors[theme.primaryColor][7],
  },
  stepDescription: {
    color: theme.colors[theme.primaryColor][7],
    backgroundColor: theme.colors[theme.primaryColor][2],
  },
  step: {
    color: 'hotpink',
    backgroundColor: theme.colors[theme.primaryColor][0],
  },
  textColorTheme: {
    color: theme.colors[theme.primaryColor][7],
  },
  required: {
    color: theme.colors['red'][7],
  },
}))
