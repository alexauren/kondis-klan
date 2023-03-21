import {
  Button,
  Card,
  Container,
  createStyles,
  Select,
  Title,
} from '@mantine/core'
import { getExerciseProgress } from 'firebase/queries/exerciseQueries'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Title as ChartTitle,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { UserContext } from '../UserAuthContext'
import { useContext, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from 'containers/Root'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { ExerciseProgressType } from '../types'
import { format } from 'date-fns'

export default function ProgressionView() {
  const user = useContext(UserContext)
  const collectionRef = collection(db, `users/${user.uid}/progresjon/`)
  const [data, loading, error] = useCollectionData(collectionRef)
  const exerciseNames = data?.map(doc => doc.name)
  const [labels, setLabels] = useState<string[]>([])
  const [weightData, setWeightData] = useState<number[]>([])
  const { classes } = useStyles()

  if (loading) {
    return <FullContentLoader />
  }
  if (error) {
    return <FullPageError />
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progresjon over tid',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Vekt',
        },
      },

      x: {
        title: {
          display: true,
          text: 'Dato',
        },
      },
    },
  }

  const graphData = {
    labels,
    datasets: [
      {
        label: '1RM',
        data: weightData,
        fill: false,
        backgroundColor: 'rgb(0, 0, 0)',
      },
    ],
  }

  function showExercise(exercise: string) {
    const exerciseData = data?.find(
      doc => doc.name === exercise
    ) as ExerciseProgressType
    const labels: string[] = []
    const weightData: number[] = []

    exerciseData.progression.forEach(doc => {
      labels.push(format(doc.time.toDate(), 'dd.MM.yyyy'))
      weightData.push(doc.rm)
    })
    setLabels(labels), setWeightData(weightData)

    graphData.datasets[0].data = weightData
    graphData.labels = labels
  }

  return (
    <Container style={{ width: '1200px' }}>
      <Card
        p={'xl'}
        radius={'lg'}
        className={classes.root}
        withBorder
        color="white"
      >
        <Title ta="left" color={'kondisGreen.8'}>
          Progresjon
        </Title>
        <Select
          my="sm"
          label="Velg øvelse"
          data={exerciseNames ? exerciseNames : []}
          placeholder="Benkpress"
          nothingFound="Ingen funnet"
          searchable
          onChange={exercise => {
            showExercise(exercise as string)
          }}
        />
        <Card radius="xl" className={classes.lineGraph}>
          <Line data={graphData} options={options} />
        </Card>
      </Card>
    </Container>
  )
}

const useStyles = createStyles(theme => ({
  root: {
    border: '2px solid',
    borderColor: theme.colors[theme.primaryColor][4],
    backgroundColor: theme.colors[theme.primaryColor][1],
  },
  lineGraph: {
    border: '2px solid',
    borderColor: theme.colors[theme.primaryColor][4],
  },
}))
