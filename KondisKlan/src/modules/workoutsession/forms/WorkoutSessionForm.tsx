
import { addDoc, collection } from "@firebase/firestore";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { db } from "../../../App";
import { WorkoutSession } from "../types";


// Async betyr at funksjonen venter på svar fra databasen før den fortsetter
// db er firebase databasen
// addDoc er en funksjon fra firebase som legger til en dokument i databasen
// Values: du sir at typen av value MÅ være WorkoutSession



export const submitWorkout = async (values: WorkoutSession) => {
  const workout = collection(db, 'workoutsessions')
  await addDoc(workout, values)
}


export function WorkoutSessionForm() {
  const form = useForm({
    initialValues: {
      title: "",
      createdAt: "",
      createdBy: "",
    },

    validate(values) {
      const errors: any = {};

      if (!values.title) {
        errors.title = "title is required";
      }

      if (!values.createdAt) {
        errors.reps = "Created at is required";
      }

      if (!values.createdBy) {
        errors.sets = "Created by is required";
      }

      return errors;
    },
  });

    //Litt forklaring her:
    // TextInput er en komponent fra Mantine som tar inn en placeholder og en onChange funksjon
    // form.getInputProps er en funksjon som returnerer en onChange funksjon og en value
    // ...form.getInputProps("title") er en spread operator som gjør at vi kan sende inn onChange og value som props til TextInput
    // Når man klikker på button, så kjører onSubmit og sender inn verdier fra formet
    // Alt wrappes i en stack for å få litt spacing mellom elementene
    // Hvis du åpner opp konsollen kan du se at å trykke på knappen console.logger verdier fra formet

    //Det nedenfor er det visuelle

  return (
    <form onSubmit={form.onSubmit((values) => submitWorkout(values))}>
        <Stack>
      <TextInput placeholder="title" {...form.getInputProps("title")} />
      <TextInput placeholder="Created at" {...form.getInputProps("createdAt")} />
      <TextInput placeholder="Created by" {...form.getInputProps("createdBy")} />
      <Group position="right">
        <Button type="submit" variant="outline"  color="orange">
          Add workout
        </Button>
      </Group>
      </Stack>
    </form>

    

    

    


  );
}
