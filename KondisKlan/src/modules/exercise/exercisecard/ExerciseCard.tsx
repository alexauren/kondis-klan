import { Card, Image, Text, Group, Stack } from "@mantine/core";
import { Exercise } from "../types";

//interface
interface ExerciseCard {
  exercise: Exercise;
}

//component
export function ExerciseCard({ exercise }: ExerciseCard) {
  const { name, ...attributes } = exercise;

  const items = Object.entries(attributes).map((attribute) => (
    <Stack>
      <Text>{attribute[0]}</Text>
      <Text weight={500} size="sm">
        {attribute[1]}
      </Text>
    </Stack>
  ));

  return (
    <Card withBorder p="md">
      <Text size="sm" weight={700}>
        {exercise.name}
      </Text>

      <Text mt="sm" mb="md" size="xs">
        Beskrivelse
      </Text>

      <Card.Section mt="md">
        <Group position="center" grow>
          {items}
        </Group>
      </Card.Section>
    </Card>
  );
}
