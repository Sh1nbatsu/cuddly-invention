import styled from 'styled-components'
import { useTopics } from '@/entities/topic/topic.context'
import { List, Spin, Typography } from 'antd'
import { TopicCard } from '../topic-card/topic-card.ui'

const { Title } = Typography

const StyledTitle = styled(Title)`
  color: var(--color-text) !important;
`

export const TopicList = () => {
  const { topics, isLoading } = useTopics()

  return (
    <div style={{ padding: '24px' }}>
      <StyledTitle level={3}>Список тем</StyledTitle>
      {isLoading ? (
        <Spin />
      ) : (
        <List
          dataSource={topics}
          renderItem={topic => <TopicCard topic={topic} />}
        />
      )}
    </div>
  )
}
