import { Topic } from '@/shared/types/Topic'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const useTopic = () => {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const id = Number(topicId)

  const [topic, setTopic] = useState<Topic | null>(null)
  const [replyTarget, setReplyTarget] = useState<number | null>(null)

  const refresh = useCallback(() => {}, [topic?.id])

  const addPlain = (text: string) => {}

  const addReply = (text: string, pid: number) => {}

  const askDeleteTopic = () => {}

  const askDeleteComment = (cid: number) => {}

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
