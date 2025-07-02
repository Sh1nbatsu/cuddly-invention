import { TopicCardProps } from '@/entities/topic/topic.types'
import { ForumComment } from '@/shared/types/Forum'
import { Button, Typography } from 'antd'
import { useState } from 'react'
import { transformComment } from '../topic-card/topic-card.utils'
import { TopicCreateModal } from '../topic-create-model/topic-create-model.ui'
import { TopicCardComment } from './topic-card-comment.ui'

export const TopicCardCommentList = ({ topic }: TopicCardProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [parentComment, setParentComment] = useState<ForumComment | null>(null)

  const handleReply = (comment: ForumComment) => {
    setParentComment(comment)
    setModalVisible(true)
  }

  const handleAddRootComment = () => {
    setParentComment(null)
    setModalVisible(true)
  }

  return (
    <>
      <div
        style={{
          padding: '16px 24px',
          backgroundColor: '#f5f7fa',
          borderRadius: '0 0 12px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {topic.comments && topic.comments.length > 0 ? (
          topic.comments.map(comment => (
            <div
              key={comment.id}
              onClick={() => handleReply(comment)}
              style={{ cursor: 'pointer' }}
              title="Ответить на комментарий">
              <TopicCardComment comment={transformComment(comment)} />
            </div>
          ))
        ) : (
          <Typography.Text type="secondary" italic>
            Нет комментариев
          </Typography.Text>
        )}

        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={handleAddRootComment}>
          Добавить комментарий
        </Button>
      </div>

      <TopicCreateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        topicId={topic.id}
        parentComment={parentComment}
        onSuccess={() => {
          // обновить список комментариев или обновить тему, если нужно
        }}
      />
    </>
  )
}
