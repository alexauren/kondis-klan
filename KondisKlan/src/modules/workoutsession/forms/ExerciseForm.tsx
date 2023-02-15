
import { addDoc, collection } from "@firebase/firestore";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { db } from "../../../App";
import { Exercise } from "../types";

//Async betyr at funksjonen venter på svar fra databasen før den fortsetter
//db er firebase databasen
//addDoc er en funksjon fra firebase som legger til en dokument i databasen
//Values: du sir at typen av value MÅ være WorkoutSession
// const submitWorkout = async (values: WorkoutSession) => {
//   const workout = collection(db, 'workoutsessions')
//   await addDoc(workout, values)
// }
//ChoosenWorkout skal bli endret basert på hvilken workout man har klikket inn på.
var choosenWorkout = ""

//submitExercise er en funksjon som legger til en exercise i databasen. Den velger hvilken workout den skal legge til i basert på variabelen choosenWorkout
export const submitExercise = async (values: Exercise) => {
  const exercise = collection(db, "workouts/" + choosenWorkout + "/exercise")
  await addDoc(exercise, values)
}


export function ExerciseForm() {
  const form = useForm({
    initialValues: {
      exerciseTitle: "",
      reps: "",
      sets: "",
    },

    validate(values) {
      const errors: any = {};

      if (!values.exerciseTitle) {
        errors.exerciseTitle = "exerciseTitle is required";
      }

      if (!values.reps) {
        errors.reps = "Created at is required";
      }

      if (!values.sets) {
        errors.sets = "Created by is required";
      }

      return errors;
    },
  });





    //Litt forklaring her:
    // TextInput er en komponent fra Mantine som tar inn en placeholder og en onChange funksjon
    // form.getInputProps er en funksjon som returnerer en onChange funksjon og en value
    // ...form.getInputProps("exerciseTitle") er en spread operator som gjør at vi kan sende inn onChange og value som props til TextInput
    // Når man klikker på button, så kjører onSubmit og sender inn verdier fra formet
    // Alt wrappes i en stack for å få litt spacing mellom elementene
    // Hvis du åpner opp konsollen kan du se at å trykke på knappen console.logger verdier fra formet

    //Det nedenfor er det visuelle

  return (
    <form onSubmit={form.onSubmit((values) => submitExercise(values))}>
        <Stack>
      <TextInput placeholder="Exercise title" {...form.getInputProps("exerciseTitle")} />
      <TextInput placeholder="Reps" {...form.getInputProps("reps")} />
      <TextInput placeholder="Sets" {...form.getInputProps("sets")} />
      <Group position="right">
        <Button type="submit" variant="outline"  color="red">
          Add exercise
        </Button>
      </Group>
      </Stack>
      <div>
      <Button color="red" name="testButton" onClick={() => choosenWorkout = "testButtonText"}>
      testButton
    </Button>
        </div>   
        </form>

    

    

    


);

  }