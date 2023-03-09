import {
  getAuth,
  createUserWithEmailAndPassword,
  UserInfo,
} from 'firebase/auth'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
  Container,
  createStyles,
  Card,
  Text,
  Stack,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
import { db } from 'containers/Root'
import { useState } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { createUserDoc } from 'firebase/queries/userQueries'

export function SignUp() {
  const auth = getAuth()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  if (error) {
    console.error(error)
    alert(error.message)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  // the user conditional will not run here because there's
  // an auth state hook in the AppRoutes.tsx file which overrides it

  function handleSubmit(values: {
    email: string
    password: string
    name: string
  }) {
    createUserWithEmailAndPassword(
      form.values.email,
      form.values.password
    ).then(user => {
      createUserDoc(user!.user, form.values.name)
      navigate('/')
      showNotification({
        title: 'Bruker opprettet',
        message: `Velkommen ${form.values.name}!`,
        icon: <IconCheck />,
      })
    })
  }

  return (
    <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
      <TextInput
        required
        label="Epost"
        placeholder=""
        {...form.getInputProps('email')}
      />

      <PasswordInput
        my={'sm'}
        required
        label="Passord"
        placeholder=""
        {...form.getInputProps('password')}
      />

      <TextInput
        required
        label="Navn"
        placeholder=""
        {...form.getInputProps('name')}
      />

      <Group position="apart" my="sm">
        <Button variant="outline" component={Link} to="/">
          Tilbake
        </Button>
        <Button type="submit">Opprett bruker</Button>
      </Group>
    </form>
  )
}
