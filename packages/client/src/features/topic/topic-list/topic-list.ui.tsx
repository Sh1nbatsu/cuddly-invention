import { useTopics } from '@/entities/topic/topic.context'
import { List, Spin, Typography } from 'antd'
import { TopicCard } from '../topic-card/topic-card.ui'

const { Title } = Typography

export const TopicList = () => {
  const { topics, isLoading } = useTopics()
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
