import { Container, Stack } from '@mantine/core'
import { useMobile } from 'util/hooks'
import { NewProgram } from './NewProgram'

export function NewProgramPage() {
  const isMobile = useMobile()
  return (
    <Container size={isMobile ? 'lg' : 'sm'} p={isMobile ? 0 : 'sm'}>
      <NewProgram />
    </Container>
  )
}
