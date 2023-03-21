import { Badge } from '@mantine/core'
import { Stack } from '@mantine/core'
import { Group } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { resetStreak } from 'firebase/queries/userQueries'
import {
  getHoursSinceLastWorkout,
  useMyCompletedWorkouts,
} from 'firebase/queries/workoutSessionQueries'
import { WorkoutSessionComplete } from 'modules/workoutsession/types'
import { UserType } from '../types'

interface StreakProps {
  user: UserType
}

export default function Streaks({ user }: StreakProps) {
  const streak = user.streak || 0
  const hours = getHoursSinceLastWorkout(user.uid)

  if (hours > 24) {
    resetStreak(user.uid)
    showNotification({
      title: 'Streak mistet',
      message: 'Du har ikke fullført en økt det siste døgnet',
    })
  }

  return (
    <Group>
      <Badge
        variant="gradient"
        gradient={{ from: 'kondisGreen.5', to: 'kondisGreen.2' }}
      >
        {streak}🔥 {24 - hours}⌛
      </Badge>
    </Group>
  )
}
