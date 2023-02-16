import {
  Text,
  Container,
  Title,
  SimpleGrid,
} from "@mantine/core";
import { Exercise } from "../../exercise/types";
import { ExerciseCard } from "../../exercise/exercisecard/ExerciseCard";
import { WorkoutSession } from "../types";

//interface
interface WorkoutCard {
  workoutsession: WorkoutSession;
  exercises: Exercise[];
}

//component
export function WorkoutCard({ workoutsession, exercises }: WorkoutCard) {
  return (
    <Container size="lg">
      <Title align="center" mt="sm">
        {workoutsession.title}
      </Title>

      <Text>
        Lagd av: {workoutsession.createdBy} på {workoutsession.createdAt}
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {exercises.map((exercise) => (
          <ExerciseCard exercise={exercise} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
