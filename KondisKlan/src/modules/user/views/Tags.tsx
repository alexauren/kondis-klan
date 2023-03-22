import { ActionIcon, Container, Select, SimpleGrid, Stack } from '@mantine/core'
import { IconExclamationMark, IconX } from '@tabler/icons-react'
import { Group, Title, Badge, Avatar, MultiSelect } from '@mantine/core'
import { FullContentLoader } from 'components/FullContentLoader'
import FullPageError from 'components/FullPageError'
import { db } from 'containers/Root'
import { doc } from 'firebase/firestore'
import {
  setUserInterests,
  updateTagsCollection,
} from 'firebase/queries/userQueries'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../UserAuthContext'
import { UserType } from '../types'
import { showNotification } from '@mantine/notifications'

interface TagViewProps {
  user: UserType
}

export function TagView({ user }: TagViewProps) {
  const { userId } = useParams() as { userId: string }
  const userLoggedIn = useContext(UserContext)
  const [tagsFromDB, loadingTags, errorTags] = useDocumentData(
    doc(db, 'tags', 'ZP3S5zqtbEnjYZRvKMxB')
  )

  if (loadingTags) {
    return <FullContentLoader />
  }
  if (errorTags) {
    return <FullPageError />
  }

  const isMe = userLoggedIn?.uid === user.uid
  const tagList = tagsFromDB?.tags
  const interests = user?.interests
  const filteredTags = tagList?.filter(
    (tag: string) => !interests?.includes(tag)
  )

  function handleRemoveTag(tag: string) {
    const tagsList = user.interests!.filter((item: string) => item !== tag)
    setUserInterests(userId, tagsList)
  }

  function handleOnChange(tag: string | null) {
    {
      !user.interests ? (user.interests = []) : null
    }
    if (tag) {
      if (user.interests.includes(tag)) {
        return
      }
      if (user.interests.length >= 10) {
        showNotification({
          title: 'Du kan ikke ha mer enn 10 interesser',
          message: 'Fjern en av dine interesser før du legger til en ny',
          color: 'orange',
          icon: <IconExclamationMark />,
        })
        return
      }
      user.interests.push(tag)
      setUserInterests(userId, user.interests)
      updateTagsCollection(tag)
    }
  }

  return (
    <Stack mb={'sm'} align={'center'} justify="center">
      <Container size={'xs'}>
        <Title order={4} ta="left">
          Mine interesser
        </Title>

        <Group position="center" mt="md" spacing="md">
          {interests?.map((tag: string) => (
            <Badge
              variant="gradient"
              gradient={{ from: 'kondisGreen.4', to: 'kondisGreen.3' }}
            >
              <Group position="center" spacing="xs">
                {tag}
                {isMe && (
                  <ActionIcon
                    size="xs"
                    radius="xl"
                    variant="transparent"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <IconX size={30} color={'white'} />
                  </ActionIcon>
                )}
              </Group>
            </Badge>
          ))}
        </Group>
        {isMe && (
          <Select
            my="sm"
            data={filteredTags}
            placeholder="Velg interesser"
            nothingFound="Ingen funnet"
            searchable
            creatable
            getCreateLabel={tags => `+ Legg til ${tags}`}
            onChange={tag => handleOnChange(tag)}
          />
        )}
      </Container>
    </Stack>
  )
}
