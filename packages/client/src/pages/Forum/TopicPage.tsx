import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Layout,
  Typography,
  Card,
  List,
  Tooltip,
  Form,
  Input,
  Button,
  Modal,
} from 'antd'
import {
  DeleteOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import {
  getTopicById,
  addComment,
  deleteComment,
  deleteTopic,
  Topic,
  ForumComment,
} from './forumData'

const { Content } = Layout
const { Title, Text } = Typography
const { confirm } = Modal

const PageContainer = styled(Content)`
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`

const CommentCard = styled(Card)<{ $nested?: boolean }>`
  margin-bottom: 12px;
  ${({ $nested }) => $nested && 'margin-left: 32px;'}
`

const TopActions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

export const TopicPage: React.FC = () => {
  const { topicId } = useParams()
  const navigate = useNavigate()

  const id = Number(topicId)
  const initial = getTopicById(id)
  const [topic, setTopic] = useState<Topic | null>(initial)
  const [replyTarget, setReplyTarget] = useState<number | null>(null)
  const [commentForm] = Form.useForm()

  if (!topic) {
    return (
      <Wrapper>
        <Header />
        <PageContainer>
          <Title level={3}>Тема не найдена</Title>
        </PageContainer>
      </Wrapper>
    )
  }

  const refresh = () => setTopic(getTopicById(topic.id))

  const addPlain = ({ text }: { text: string }) => {
    addComment(topic.id, text.trim())
    refresh()
    commentForm.resetFields()
  }

  const addReply = (txt: string, pid: number) => {
    addComment(topic.id, txt.trim(), pid)
    refresh()
    setReplyTarget(null)
  }

  const askDeleteTopic = () => {
    confirm({
      title: 'Удалить тему целиком?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        deleteTopic(topic.id)
        navigate('/forum')
      },
    })
  }

  const askDeleteComment = (cid: number) => {
    confirm({
      title: 'Удалить комментарий?',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        deleteComment(topic.id, cid)
        refresh()
      },
    })
  }

  const ReplyForm: React.FC<{ pid: number }> = ({ pid }) => {
    const [form] = Form.useForm()

    const submit = ({ text }: { text: string }) => {
      addReply(text, pid)
      form.resetFields()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        form.submit()
      }
    }

    return (
      <Form form={form} onFinish={submit} style={{ marginTop: 8 }}>
        <Form.Item
          name="text"
          rules={[{ required: true, message: 'Введите текст' }]}>
          <Input.TextArea
            autoSize
            placeholder="Ваш ответ…"
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" size="small">
            Ответить
          </Button>
          <Button
            size="small"
            style={{ marginLeft: 8 }}
            onClick={() => setReplyTarget(null)}>
            Отмена
          </Button>
        </Form.Item>
      </Form>
    )
  }

  const renderComment = (c: ForumComment, nested = false): JSX.Element => (
    <CommentCard size="small" $nested={nested} key={c.id} bordered={false}>
      <Title level={5} style={{ marginBottom: 4 }}>
        Anonymous{' '}
        <Text type="secondary" style={{ fontSize: 12 }}>
          <Tooltip title={c.date}>{c.date}</Tooltip>
        </Text>
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          style={{ marginLeft: 8 }}
          onClick={() => askDeleteComment(c.id)}
        />
      </Title>

      <Text>{c.text}</Text>

      <div style={{ marginTop: 8 }}>
        <Button type="link" size="small" onClick={() => setReplyTarget(c.id)}>
          Ответить
        </Button>
      </div>

      {replyTarget === c.id && <ReplyForm pid={c.id} />}
      {c.replies.map(r => renderComment(r, true))}
    </CommentCard>
  )

  return (
    <Wrapper>
      <Header />
      <PageContainer as="main">
        <TopActions>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            Назад
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={askDeleteTopic}>
            Удалить тему
          </Button>
        </TopActions>

        <Title level={2} style={{ marginBottom: 12 }}>
          {topic.title}
        </Title>

        <Card style={{ marginBottom: 24 }}>
          <Title level={5} style={{ marginBottom: 8 }}>
            Автор — {topic.author} | {topic.date}
          </Title>
          <Text>{topic.text}</Text>
        </Card>

        <Title level={4}>Комментарии</Title>

        {topic.comments.length ? (
          <List
            dataSource={topic.comments}
            renderItem={item => <List.Item>{renderComment(item)}</List.Item>}
            itemLayout="vertical"
            split={false}
          />
        ) : (
          <Text type="secondary">Комментариев нет</Text>
        )}

        <Card
          title="Добавить комментарий"
          style={{ width: '100%', marginTop: 32 }}>
          <Form form={commentForm} layout="vertical" onFinish={addPlain}>
            <Form.Item
              name="text"
              rules={[
                { required: true, message: 'Введите текст комментария' },
              ]}>
              <Input.TextArea rows={4} placeholder="Введите текст…" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    </Wrapper>
  )
}
