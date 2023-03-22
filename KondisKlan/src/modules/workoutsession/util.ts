import { showNotification } from '@mantine/notifications'
import { IconExclamationCircle } from '@tabler/icons-react'
import { db } from 'containers/Root'
import { differenceInHours, formatDistance } from 'date-fns'
import { doc, updateDoc } from 'firebase/firestore'
import { UserType } from 'modules/user/types'
import { UserContext } from 'modules/user/UserAuthContext'
import { useContext } from 'react'
import { WorkoutSessionComplete } from './types'

interface StreakCheckerProps {
  workouts: WorkoutSessionComplete[]
}

export function streakChecker({ workouts }: StreakCheckerProps) {
  const loggedInUser = useContext(UserContext)
  // TODO: Implement streak checker
  // We assume the workouts to already be sorted.
  // Then the only thin  console.log('Streak: ', streak)g we need to check, is whether the last date has a difference of more than 1 day.
  // If so, we return 0, otherwise we return the streak + 1

  // Checking for workouts first object
  const recentlyCompletedWorkout = workouts[0]
  if (!recentlyCompletedWorkout) {
    return 0
  }

  // Checking for the difference between the last workout and the current date
  const lastWorkoutDate = new Date(
    recentlyCompletedWorkout.completedAt.toDate()
  )
  const currentDate = new Date()

  const differenceInTime = differenceInHours(currentDate, lastWorkoutDate)
  console.log(differenceInTime)
  if (differenceInTime > 24) {
    updateUserStreak(0, loggedInUser.uid)
    return 0
  } else {
    updateUserStreak(loggedInUser.streak, loggedInUser.uid)
    return loggedInUser.streak
  }
}

interface AddToStreakProps {
  workouts: WorkoutSessionComplete[]
  user: UserType
}

export function addToStreak({ workouts, user }: AddToStreakProps) {
  const loggedInUser = user
  if (!loggedInUser.streak) {
    loggedInUser.streak = 0
  }

  if (workouts.length === 0) {
    updateUserStreak(0, loggedInUser.uid)
    return 0
  }

  // check if the two previous workouts are completed within 24 hours
  // if both are completed within 24 hours, add nothing
  // if one is completed within 24 hours, add 1

  //check if we have at least two workouts
  if (workouts.length < 2) {
    updateUserStreak(1, loggedInUser.uid).then(() => {
      showNotification({
        color: 'cyan',
        message: `You have earned a streak point! You now have ${1} streak points.`,
      })
    })
    return 0
  }

  const previousWorkout1 = workouts[0]
  const previousWorkout2 = workouts[1]

  if (!previousWorkout1 || !previousWorkout2) {
    return 0
  }

  const lastWorkoutDate1 = new Date(previousWorkout1.completedAt.toDate())
  const lastWorkoutDate2 = new Date(previousWorkout2.completedAt.toDate())

  const differenceInTime1 = differenceInHours(
    lastWorkoutDate1,
    lastWorkoutDate2
  )
  const differenceInTime2 = differenceInHours(lastWorkoutDate2, new Date())

  if (differenceInTime1 < 24 && differenceInTime2 < 24) {
    showNotification({
      color: 'cyan',
      message:
        'You need to complete two workouts within 24 hours of each other to receive a streak point.',
    })
    updateUserStreak(loggedInUser.streak, loggedInUser.uid)
    return 0
  } else if (differenceInTime1 < 24 || differenceInTime2 < 24) {
    showNotification({
      color: 'green',
      message: 'Streak updated!',
    })
    updateUserStreak(loggedInUser.streak + 1, loggedInUser.uid)
    return 1
  } else {
    showNotification({
      color: 'purple',
      message:
        'You will receive a streak point if you complete two workouts within 24 hours of each other.',
    })
    updateUserStreak(loggedInUser.streak, loggedInUser.uid)
    return 0
  }
}

async function updateUserStreak(streak: number, uid: string) {
  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, {
    streak: streak,
  })
}
