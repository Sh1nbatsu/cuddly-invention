import { CreateFormNoteData } from '@/entities/forum/forum.types'
import { Topic } from '@/shared/types/Topic'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const useForumLogic = () => {
  const { reset } = useFormContext()
  const navigate = useNavigate()
  const [data, setData] = useState<Topic[]>()

  const refresh = useCallback(() => setData([]), [])

  const handleDeleteTheme = useCallback((id: number) => {}, [navigate])

  const handleCreateTopic = useCallback(
    (data: CreateFormNoteData) => {},
    [reset]
  )

  return {
    data,
    handleDeleteTheme,
    handleCreateTopic,
  }
}
