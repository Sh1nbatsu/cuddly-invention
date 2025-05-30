// topic-comment.ui.tsx
import { useTopic } from '@/entities/topic/topic.hooks'
import { ForumComment } from '@/shared/types/Forum'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip, Typography } from 'antd'
import { TopicReplyForm } from '../topic-reply-form/topic-reply-form.ui'
import { CommentCard } from './topic-comment.styled'

const { Title, Text } = Typography

export const TopicComment = ({
  comment,
  nested,
}: {
  comment: ForumComment
  nested?: boolean
}) => {
  const { replyTarget, setReplyTarget, askDeleteComment } = useTopic()

  return (
    <CommentCard size="small" $nested={nested} bordered={false}>
      <Title level={5} style={{ marginBottom: 4 }}>
        Anonymous
        <Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>
          <Tooltip title={comment.date}>{comment.date}</Tooltip>
        </Text>
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          style={{ marginLeft: 8 }}
          onClick={() => askDeleteComment(comment.id)}
        />
      </Title>

      <Text>{comment.text}</Text>

      <div style={{ marginTop: 8 }}>
        <Button
          type="link"
          size="small"
          onClick={() => setReplyTarget(comment.id)}>
          Ответить
        </Button>
      </div>

      {replyTarget === comment.id && <TopicReplyForm pid={comment.id} />}
      {comment.replies.map(r => (
        <TopicComment key={r.id} comment={r} nested />
      ))}
    </CommentCard>
  )
}
