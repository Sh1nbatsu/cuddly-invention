import { Topic } from '@/shared/types/Topic'
import { List, Spin, Typography } from 'antd'
import { TopicCard } from '../topic-card/topic-card.ui'

const { Title } = Typography

interface TopicListProps {
  topics: Topic[]
  isLoading: boolean
}

export const TopicList = ({ topics, isLoading }: TopicListProps) => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>Список тем</Title>
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
