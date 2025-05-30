import { CreateFormNoteData } from '@/entities/forum/forum.types'
import { Topic } from '@/shared/types/Topic'
import { Modal } from 'antd'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { addTopic, deleteTopic, topics } from './forum.data'

export const useForumLogic = () => {
  const { reset } = useFormContext()
  const navigate = useNavigate()
  const [data, setData] = useState<Topic[]>([...topics])

  const refresh = useCallback(() => setData([...topics]), [])

  const handleDeleteTheme = useCallback(
    (id: number) => {
      Modal.confirm({
        title: 'Удалить тему?',
        okText: 'Удалить',
        okType: 'danger',
        cancelText: 'Отмена',
        onOk() {
          deleteTopic(id)
          refresh()
          navigate('/forum')
        },
      })
    },
    [navigate]
  )

  const handleCreateTopic = useCallback(
    (data: CreateFormNoteData) => {
      addTopic(data.title.trim(), data.text.trim())
      refresh()
      reset()
    },
    [reset]
  )

  return {
    data,
    handleDeleteTheme,
    handleCreateTopic,
  }
}
