import { useTopic } from '@/entities/topic/topic.hooks'
import { PageContainer, TopActions } from '@/entities/topic/topic.styled'
import { TopicComment } from '@/features/topic/topic-comment/topic-comment.ui'
import { TopicForm } from '@/features/topic/topic-form/topic-form.ui'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Card, List, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { TopicNotFound } from './topic-not-found'

const { Title, Text } = Typography

export const TopicWidget = () => {
  const navigate = useNavigate()
  const { topic, askDeleteTopic } = useTopic()

  if (!topic) return <TopicNotFound />

  return (
    <PageContainer>
      <TopActions>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Button danger icon={<DeleteOutlined />} onClick={askDeleteTopic}>
          Удалить тему
        </Button>
      </TopActions>

      <Title level={2}>{topic.title}</Title>

      <Card style={{ marginBottom: 24 }}>
        <Title level={5}>
          Автор — {topic.author} | {topic.date}
        </Title>
        <Text>{topic.text}</Text>
      </Card>

      <Title level={4}>Комментарии</Title>

      {topic.comments.length ? (
        <List
          dataSource={topic.comments}
          renderItem={item => (
            <List.Item>
              <TopicComment comment={item} />
            </List.Item>
          )}
          itemLayout="vertical"
          split={false}
        />
      ) : (
        <Text type="secondary">Комментариев нет</Text>
      )}

      <TopicForm />
    </PageContainer>
  )
}
