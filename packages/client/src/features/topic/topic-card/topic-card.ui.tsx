import { Topic } from '@/shared/types/Topic'
import { CalendarOutlined, UserOutlined } from '@ant-design/icons'
import {
  IconStyled,
  MetaItem,
  StyledTopicCard,
  StyledTopicCardMeta,
  StyledTopicCardTitle,
} from './topic-card.styled'

interface TopicCardProps {
  topic: Topic
}

export const TopicCard = ({ topic }: TopicCardProps) => {
  const formattedDate = new Date(topic.createdAt).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <StyledTopicCard onClick={() => console.log('Navigate to topic', topic.id)}>
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
      </StyledTopicCardMeta>
    </StyledTopicCard>
  )
}
