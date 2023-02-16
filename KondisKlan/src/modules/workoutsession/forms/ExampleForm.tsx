import { TextInput, Group, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

export function ExampleForm() {
  const form = useForm({
    initialValues: {
      title: "",
      createdAt: "",
      createdBy: "",
    },

    validate(values) {
      const errors: any = {};

      if (!values.title) {
        errors.title = "Title is required";
      }

      if (!values.createdAt) {
        errors.createdAt = "Created at is required";
      }

      if (!values.createdBy) {
        errors.createdBy = "Created by is required";
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

  // return (
  //   <form onSubmit={form.onSubmit((values) => console.log(values))}>
  //       <Stack>
  //     <TextInput placeholder="tittel" {...form.getInputProps("title")} />
  //     <TextInput
  //       placeholder="dato laget"
  //       {...form.getInputProps("createdAt")}
  //     />
  //     <TextInput placeholder="laget av" {...form.getInputProps("createdBy")} />
      
  //     <Group position="right">
  //       <Button type="submit" variant="outline"  color="red">
  //         Submit
  //       </Button>
  //     </Group>
  //     </Stack>
  //   </form>
  // );
}
