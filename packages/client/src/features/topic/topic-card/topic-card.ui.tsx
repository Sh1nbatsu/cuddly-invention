import { TopicCardProps } from '@/entities/topic/topic.types'
import {
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { TopicCardCommentList } from '../topic-card-comment/topic-card-comment-list.ui'
import {
  IconStyled,
  MetaItem,
  StyledTopicCard,
  StyledTopicCardMeta,
  StyledTopicCardTitle,
} from './topic-card.styled'

const formatDateShort = (dateString: string) =>
  new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

export const TopicCard = ({ topic }: TopicCardProps) => {
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

      {expanded && <TopicCardCommentList topic={topic} />}
    </>
  )
}
