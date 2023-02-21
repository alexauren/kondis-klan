import { Button, Container, Stack } from '@mantine/core'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from './LoginForm'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Container mt={'md'} size={400}>
      <Stack>
        <LoginForm
          isLoadingCallback={isLoading}
          setIsLoadingCallback={setIsLoading}
        />

        {!isLoading && (
          <Button component={Link} to="/signup">
            Opprett Bruker
          </Button>
        )}
      </Stack>
    </Container>
  )
}

export default LoginPage
