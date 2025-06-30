import { getTopics } from '@/entities/topic/topic.api'
import { Topic } from '@/shared/types/Topic'
import { List, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Title } = Typography

export const TopicList = () => {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics()
        setTopics(data)
      } catch (error) {
        console.error('Ошибка при получении тем:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [])

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>Список тем</Title>
      {loading ? (
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
