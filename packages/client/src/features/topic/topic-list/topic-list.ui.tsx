import { TopicCardProps } from '@/entities/topic/topic.types'
import { List, Spin, Typography } from 'antd'
import { TopicCard } from '../topic-card/topic-card.ui'

const { Title } = Typography

interface TopicListProps {
  topics: Array<TopicCardProps['topic']>
  isLoading: boolean
  fetchTopics: () => Promise<void>
}

export const TopicList = ({
  topics,
  isLoading,
  fetchTopics,
}: TopicListProps) => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>Список тем</Title>
      {isLoading ? (
        <Spin />
      ) : (
        <List
          dataSource={topics}
          renderItem={topic => (
            <TopicCard topic={topic} fetchTopics={fetchTopics} />
          )}
        />
      )}
    </div>
  )
}
