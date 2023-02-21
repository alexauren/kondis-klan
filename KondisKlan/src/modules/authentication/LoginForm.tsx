import { TextInput, PasswordInput, Group, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import FullPageLoader from 'components/FullPageLoader'
import { getAuth } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
  isLoadingCallback: boolean
  setIsLoadingCallback: (isLoading: boolean) => void
}

export function LoginForm({
  isLoadingCallback,
  setIsLoadingCallback,
}: LoginFormProps) {
  const auth = getAuth()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  if (error) {
    console.error(error)
    alert(error.message)
  }

  if (loading) {
    setIsLoadingCallback(true)
    return <FullContentLoader />
  }

  if (user) {
    navigate('/')
  }

  function handleSubmit(values: { email: string; password: string }) {
    signInWithEmailAndPassword(form.values.email, form.values.password)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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

      <Group grow>
        <Button type="submit" variant="outline">
          Logg inn
        </Button>
      </Group>
    </form>
  )
}
