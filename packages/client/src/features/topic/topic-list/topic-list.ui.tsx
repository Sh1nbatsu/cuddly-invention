import { Topic } from '@/shared/types/Topic'
import { List, Spin, Typography } from 'antd'

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
          bordered
          dataSource={topics}
          renderItem={item => <List.Item>{item.title}</List.Item>}
        />
      )}
    </div>
  )
}
