import { createStyles, Card, Image, Text, Group, RingProgress } from '@mantine/core';
// CSS
const useStyles = createStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  },
}));

//interface
interface WorkoutCard {
  image: string;
  title: string;
  description: string;
  stats: {
    title: string;
    value: string;
  }[];
}

//component
export function WorkoutCard({ image, title, description, stats }: WorkoutCard) {
  const { classes } = useStyles();
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
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  )
}

// Example
//import { WorkoutCard } from './modules/workoutsession/workoutcard/WorkoutCard'
{/* <WorkoutCard
image={"https://www.gymgrossisten.no/on/demandware.static/-/Sites-Gymgrossisten-Library/default/dwfe1a19d3/page_designer_articles/slik-blir-du-bedre-i-benkpress2.jpg"}
title="Benkpress"
description="Benkpress er en øvelse som trener bryst, skuldre og triceps."
stats={[
  { title: 'Sets', value: '3' },
  { title: 'Reps', value: '5' },
  { title: 'Vekt', value: '100kg' },
]}
/>
<WorkoutCard */}