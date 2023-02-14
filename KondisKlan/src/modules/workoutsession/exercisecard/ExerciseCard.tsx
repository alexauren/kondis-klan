import {Card, Image, Text, Group } from '@mantine/core';

//interface
interface ExerciseCard {
  image: string;
  title: string;
  description: string;
  stats: {
    title: string;
    value: string;
  }[];
}

//component
export function ExerciseCard({ image, title, description, stats }: ExerciseCard) {
  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text>
        {stat.title}
      </Text>
      <Text weight={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="md" mt={200} >
      <Card.Section>
        <Image src={image} alt={title} height={200} />
      </Card.Section>

      <Text size="sm" weight={700}>
        {title}
      </Text>

      <Text mt="sm" mb="md" size="xs">
        {description}
      </Text>
      <Card.Section>
        <Group position="center" >
          {items}
        </Group>
      </Card.Section>
    </Card>
  )
}

// Example

//import { ExerciseCard } from './modules/workoutsession/exercisecard/ExerciseCard'
// <ExerciseCard
//         image={reactLogo}
//         title="React"
//         description="A JavaScript library for building user interfaces"
//         stats={[
//           { title: 'Stars', value: '56k' },
//           { title: 'Forks', value: '6.9k' },
//           { title: 'Issues', value: '3' },
//         ]}/>
