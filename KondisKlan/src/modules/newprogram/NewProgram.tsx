import { useState, useEffect } from 'react'
import {
  Stepper,
  Button,
  Group,
  Modal,
  TextInput,
  Card,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { DatePicker } from '@mantine/dates'

export function NewProgram() {
  const [active, setActive] = useState(0)
  const nextStep = () =>
    setActive(current => (current < 2 ? current + 1 : current))
  const prevStep = () =>
    setActive(current => (current > 0 ? current - 1 : current))
  const [opened, setOpened] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const form = useForm({
    //data for testing purposes
    //initialValues: { name: "", email: "", Date: "" },
    initialValues: {
      name: 'Workout',
      email: 'john@smith.com',
      Date: new Date(),
    },
    validateInputOnBlur: true,
    validate: {
      name: value =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  useEffect(() => {
    setIsValid(Object.keys(form.errors).length === 0)
  }, [form.errors])

  return (
    <>
      <Card withBorder shadow={'sm'}>
        <Title> New Program</Title>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          mt="md"
        >
          <Stepper.Step label="First step" description="Create a new program">
            <form>
              <TextInput
                withAsterisk
                label="Name of program"
                placeholder="Push, Pull, Legs"
                {...form.getInputProps('name')}
              />
              <TextInput
                mt="sm"
                label="Createdby (will be auto filled)"
                placeholder="john@smith.com"
                {...form.getInputProps('email')}
              />
              <DatePicker
                label="Created date"
                placeholder="Choose date"
                {...form.getInputProps('Date')}
              />
            </form>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Choose exercises">
            <Button variant="outline" onClick={() => setOpened(true)}>
              Choose exercises
            </Button>
            <Modal
              title="Choose exercises"
              opened={opened}
              onClose={() => setOpened(false)}
            >
              *formet til Lasse*
            </Modal>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button edit your program. registred data:
            {JSON.stringify(form.values, null, 2)}
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep} disabled={!isValid}>
            {active === 2 ? 'Finish' : 'Next step'}
          </Button>
        </Group>
      </Card>
    </>
  )
}
