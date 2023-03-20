import { Group, Select } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { useUserCollection } from 'firebase/queries/userQueries'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserType } from '../types'

export function UserSearch() {
  const { data, loading, error } = useUserCollection()
  const [value, setValue] = useState<string | null>(null)
  const navigate = useNavigate()

  if (loading) {
    return <FullContentLoader />
  }

  if (error || !data) {
    return <FullPageError />
  }

  const handleClick = (value: string) => {
    setValue(null)
    // TODO: On click, send logged in user to profile page of user clicked
    navigate('/profile/' + value)
  }

  const users = data as UserType[]
  const userList = users.map(user => ({
    label: user.name,
    value: user.uid,
    ...user,
  }))

  return (
    <Group>
      <IconSearch color="gray" size={20} />
      <Select
        placeholder="Søk"
        searchable
        value={value}
        nothingFound="No options"
        onChange={handleClick}
        data={userList}
      />
    </Group>
  )
}
