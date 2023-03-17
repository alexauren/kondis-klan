import { MultiSelect } from '@mantine/core'
import { updateTagsCollection } from 'firebase/queries/userQueries'
import { useState } from 'react'

interface StepperTagsProps {
  tags: string[]
  callback: (tags: string[]) => void
  data: string[]
}

export function StepperTags({
  tags,
  callback,
  data: tagList,
}: StepperTagsProps) {
  const [data, setData] = useState<string[]>(tagList)
  const [selected, setSelected] = useState<string[]>([])
  return (
    <MultiSelect
      label="Mine tags"
      value={selected}
      data={data} //replace with all tags
      placeholder="Velg tags"
      nothingFound="Ingen funnet"
      searchable
      multiple
      creatable
      getCreateLabel={tags => `+ Legg til ${tags}`}
      onCreate={query => {
        const item = { value: query, label: query }
        setData(current => [...current, item.value])
        updateTagsCollection(item.value)
        return item
      }}
      onChange={tag => {
        //set selected tags
        setSelected(tag)
        callback(tag)
      }}
    />
  )
}
