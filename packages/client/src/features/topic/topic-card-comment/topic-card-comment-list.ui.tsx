import { TopicCardProps } from '@/entities/topic/topic.types'
import { Typography } from 'antd'
import { transformComment } from '../topic-card/topic-card.utils'
import { TopicCardComment } from './topic-card-comment.ui'

export const TopicCardCommentList = ({ topic }: TopicCardProps) => {
  return (
    <div
      style={{
        padding: '16px 24px',
        backgroundColor: '#f5f7fa',
        borderRadius: '0 0 12px 12px',
      }}>
      {topic.comments && topic.comments.length > 0 ? (
        topic.comments.map(comment => (
          <TopicCardComment
            key={comment.id}
            comment={transformComment(comment)}
          />
        ))
      ) : (
        <Typography.Text type="secondary" italic>
          Нет комментариев
        </Typography.Text>
      )}
    </div>
  )
}
