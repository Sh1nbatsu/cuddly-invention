import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addComment,
  deleteComment,
  deleteTopic,
  getTopicById,
  Topic,
} from '../forum/forum.data'

export const useTopic = () => {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const id = Number(topicId)
  const initial = getTopicById(id)

  const [topic, setTopic] = useState<Topic | null>(initial)
  const [replyTarget, setReplyTarget] = useState<number | null>(null)

  const refresh = useCallback(() => {
    if (topic?.id) {
      setTopic(getTopicById(topic.id))
    }
  }, [topic?.id])

  const addPlain = (text: string) => {
    if (!topic) return
    addComment(topic.id, text.trim())
    refresh()
  }

  const addReply = (text: string, pid: number) => {
    if (!topic) return
    addComment(topic.id, text.trim(), pid)
    refresh()
    setReplyTarget(null)
  }

  const askDeleteTopic = () => {
    if (!topic) return
    import('antd').then(({ Modal }) =>
      Modal.confirm({
        title: 'Удалить тему целиком?',
        icon: <></>,
        okText: 'Удалить',
        okType: 'danger',
        cancelText: 'Отмена',
        onOk() {
          deleteTopic(topic.id)
          navigate('/forum')
        },
      })
    )
  }

  const askDeleteComment = (cid: number) => {
    if (!topic) return
    import('antd').then(({ Modal }) =>
      Modal.confirm({
        title: 'Удалить комментарий?',
        icon: <></>,
        okText: 'Удалить',
        okType: 'danger',
        cancelText: 'Отмена',
        onOk() {
          deleteComment(topic.id, cid)
          refresh()
        },
      })
    )
  }

  return {
    topic,
    replyTarget,
    setReplyTarget,
    addPlain,
    addReply,
    askDeleteTopic,
    askDeleteComment,
  }
}
