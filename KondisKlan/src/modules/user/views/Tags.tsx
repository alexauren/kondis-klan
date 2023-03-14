import { ActionIcon, Container, SimpleGrid } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
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

export default function TagView() {
  const { userId } = useParams() as { userId: string }
  const userRef = doc(db, 'users', userId)
  const [value, loading, error] = useDocumentData(userRef)
  const [tagsFromDB, loadingTags, errorTags] = useDocumentData(
    doc(db, 'tags', 'ZP3S5zqtbEnjYZRvKMxB')
  )
  const tagList = tagsFromDB?.tags
  if (loading || loadingTags) {
    return <FullContentLoader />
  }
  if (error || errorTags) {
    return <FullPageError />
  }

  const user = value
  const interests = user?.interests

  function handleRemoveTag(tag: string) {
    const tagsList = user?.interests.filter((item: string) => item !== tag)
    setUserInterests(userId, tagsList)
  }

  return (
    <Container style={{ width: '1200' }}>
      <Title ta="left">Tags</Title>
      <Group position="center" mt="md" spacing="md">
        {interests?.map((tag: string) => (
          <Badge mt="md">
            <Group position="center" spacing="xs">
              {tag}
              <ActionIcon
                size="xs"
                radius="xl"
                variant="transparent"
                onClick={() => handleRemoveTag(tag)}
              >
                <IconX size={30} />
              </ActionIcon>
            </Group>
          </Badge>
        ))}
      </Group>

      <MultiSelect
        label="Nye interesser"
        data={tagList}
        placeholder="Velg interesser"
        nothingFound="Ingen funnet"
        searchable
        creatable
        getCreateLabel={tags => `+ Legg til ${tags}`}
        onChange={tags => {
          const tagsList = user?.interests.concat(tags)
          const tagsArray = Array.from(new Set<string>(tagsList))
          setUserInterests(userId, tagsArray)
          updateTagsCollection(tags)
        }}
      />
    </Container>
  )
}
