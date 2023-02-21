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
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
import { db } from 'containers/Root'
import { useState } from 'react'

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

  const [displayName, setDisplayName] = useState<string>('')
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  if (error) {
    console.error(error)
    alert(error.message)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    createUserDoc(user.user, displayName).then(() => {
      navigate('/')
    })
  }

  function handleSubmit(values: {
    email: string
    password: string
    name: string
  }) {
    setDisplayName(form.values.name)
    createUserWithEmailAndPassword(form.values.email, form.values.password)
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

async function createUserDoc({ uid, email }: UserInfo, displayName: string) {
  await setDoc(doc(db, 'users', uid), {
    uid: uid,
    name: displayName,
    authProvider: 'local',
    email: email,
  })
}
