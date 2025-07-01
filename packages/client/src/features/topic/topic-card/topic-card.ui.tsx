import { ForumComment } from '@/shared/types/Forum'
import { Topic } from '@/shared/types/Topic'
import {
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Typography } from 'antd'
import React, { useState } from 'react'
import { TopicCardComment } from './topic-card-comment.ui'
import {
  IconStyled,
  MetaItem,
  StyledTopicCard,
  StyledTopicCardMeta,
  StyledTopicCardTitle,
} from './topic-card.styled'
import { transformComment } from './topic-card.utils'

const { Text } = Typography

interface TopicCardProps {
  topic: Topic & { comments?: ForumComment[] }
}

const formatDateShort = (dateString: string) =>
  new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const [expanded, setExpanded] = useState(false)

  const formattedDate = formatDateShort(topic.createdAt)

  const handleToggleComments = () => {
    setExpanded(prev => !prev)
  }

  return (
    <>
      <StyledTopicCard onClick={handleToggleComments}>
        <StyledTopicCardTitle>{topic.title}</StyledTopicCardTitle>

        <StyledTopicCardMeta>
          <MetaItem>
            <IconStyled>
              <UserOutlined />
            </IconStyled>
            <span>{topic.author.login}</span>
          </MetaItem>

          <MetaItem>
            <IconStyled>
              <CalendarOutlined />
            </IconStyled>
            <span>{formattedDate}</span>
          </MetaItem>

          <MetaItem>
            <IconStyled>
              <MessageOutlined />
            </IconStyled>
            <span>{topic.comments?.length || 0}</span>
          </MetaItem>
        </StyledTopicCardMeta>
      </StyledTopicCard>

      {expanded && (
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
            <Text type="secondary" italic>
              Нет комментариев
            </Text>
          )}
        </div>
      )}
    </>
  )
}
