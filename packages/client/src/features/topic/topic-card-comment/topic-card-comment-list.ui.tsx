import { TopicCardProps } from '@/entities/topic/topic.types'
import { ParentComment } from '@/shared/types/Forum'
import { Button, Space, Typography } from 'antd'
import { useState } from 'react'
import { transformComment } from '../topic-card/topic-card.utils'
import { TopicCreateModal } from '../topic-create-modal/topic-create-modal.ui'
import { TopicCardComment } from './topic-card-comment.ui'

const { Text, Title } = Typography

export const TopicCardCommentList = ({
  topic,
  fetchTopics,
}: TopicCardProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [parentComment, setParentComment] = useState<ParentComment | null>(null)

  const handleReply = (comment: ParentComment) => {
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
          padding: '20px 24px',
          backgroundColor: '#f9fafb',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
        }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" onClick={handleAddRootComment} block>
            Добавить комментарий
          </Button>

          {topic.comments && topic.comments.length > 0 ? (
            <div>
              <Title level={5} style={{ margin: '16px 0 8px' }}>
                Комментарии ({topic.comments.length})
              </Title>

              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {topic.comments.map(comment => (
                  <div
                    key={comment.id}
                    style={{
                      background: '#fff',
                      padding: 16,
                      borderRadius: 8,
                      boxShadow: '0 1px 4px rgb(0 0 0 / 0.1)',
                      transition: 'box-shadow 0.3s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.boxShadow =
                        '0 4px 12px rgb(0 0 0 / 0.15)'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.boxShadow =
                        '0 1px 4px rgb(0 0 0 / 0.1)'
                    }}>
                    <TopicCardComment comment={transformComment(comment)} />
                    <div style={{ marginTop: 8, textAlign: 'right' }}>
                      <Button
                        type="link"
                        size="small"
                        onClick={() => handleReply(comment)}>
                        Ответить
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Text
              type="secondary"
              italic
              style={{ marginTop: 12, display: 'block' }}>
              Пока нет комментариев. Будьте первым, кто оставит отзыв!
            </Text>
          )}
        </Space>
      </div>

      <TopicCreateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        topicId={topic.id}
        parentComment={parentComment}
        onSuccess={fetchTopics}
      />
    </>
  )
}
