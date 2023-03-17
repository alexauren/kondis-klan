import { Button, Container, Select, Title } from '@mantine/core'
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

export default function ProgressionView() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
  )

  return (
    <Container style={{ width: '1200px' }}>
      <Title ta="left">Grafer</Title>
      <Button
        onClick={() =>
          console.log(
            getExerciseProgress('CRZtS3xn9sODyC7puKEEyrRQFCi1', 'benkpress')
          )
        }
      >
        GetRMmax
      </Button>
      {/* <Select
        label="Legg til nye interesser. Begynn å skrive for å legge til en interresse som ikke er i listen."
        data={}
        placeholder="Velg interesser"
        nothingFound="Ingen funnet"
        searchable
        onChange={tags => {
          const tagsList = user?.interests.concat(tags)
          const tagsArray = Array.from(new Set<string>(tagsList))
          setUserInterests(userId, tagsArray)
          updateTagsCollection(tags)
        }}
      /> */}
      <Line data={data} options={options} />
    </Container>
  )
}

export const options = {
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
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}
