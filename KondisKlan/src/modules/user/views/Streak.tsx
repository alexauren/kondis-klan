import { Badge } from '@mantine/core'
import { Group } from '@mantine/core'
import { UserType } from '../types'

interface StreakProps {
  user: UserType
}

export default function Streaks({ user }: StreakProps) {
  const streak = user.streak || 0
  return (
    <Group>
      <Badge
        variant="gradient"
        gradient={{ from: 'kondisGreen.5', to: 'kondisGreen.2' }}
      >
        {streak}🔥
      </Badge>
    </Group>
  )
}
