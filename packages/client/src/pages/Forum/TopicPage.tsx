import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, List, Input, Tooltip, Typography, Modal } from 'antd'
import {
  DeleteOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import { TopicNotFound } from '@/components/Forum/TopicNotFound'
import {
  getTopicById,
  addComment,
  deleteComment,
  deleteTopic,
  Topic,
  ForumComment,
} from './forumData'
import { PageContainer, CommentCard, TopActions } from './styled'

const { Title, Text } = Typography
const { confirm } = Modal

type CommentFormData = { text: string }

export const TopicPage = () => {
  const { topicId } = useParams()
  const navigate = useNavigate()

  const id = Number(topicId)
  const initial = getTopicById(id)
  const [topic, setTopic] = useState<Topic | null>(initial)
  const [replyTarget, setReplyTarget] = useState<number | null>(null)

  const {
    control: plainControl,
    handleSubmit: handlePlainSubmit,
    reset: resetPlain,
    formState: { errors: plainErrors },
  } = useForm<CommentFormData>()

  if (!topic) {
    return <TopicNotFound />
  }

  const refresh = (): void => setTopic(getTopicById(topic.id))

  const addPlain = ({ text }: CommentFormData): void => {
    addComment(topic.id, text.trim())
    refresh()
    resetPlain()
  }

  const addReply = (txt: string, pid: number): void => {
    addComment(topic.id, txt.trim(), pid)
    refresh()
    setReplyTarget(null)
  }

  const askDeleteTopic = (): void => {
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

  const askDeleteComment = (cid: number): void => {
    confirm({
      title: 'Удалить комментарий?',
      icon: <ExclamationCircleOutlined />,
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
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<CommentFormData>()

    const submit = ({ text }: CommentFormData): void => {
      addReply(text, pid)
      reset()
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(submit)()
      }
    }

    return (
      <form onSubmit={handleSubmit(submit)} style={{ marginTop: 8 }}>
        <Controller
          name="text"
          control={control}
          rules={{ required: 'Введите текст ответа' }}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              autoSize
              placeholder="Ваш ответ…"
              onKeyDown={onKeyDown}
              autoFocus
            />
          )}
        />
        {errors.text && <Text type="danger">{errors.text.message}</Text>}
        <div style={{ marginTop: 8 }}>
          <Button type="primary" htmlType="submit" size="small">
            Ответить
          </Button>
          <Button
            size="small"
            style={{ marginLeft: 8 }}
            onClick={() => setReplyTarget(null)}>
            Отмена
          </Button>
        </div>
      </form>
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
          <form onSubmit={handlePlainSubmit(addPlain)}>
            <Controller
              name="text"
              control={plainControl}
              rules={{ required: 'Введите текст комментария' }}
              render={({ field }) => (
                <Input.TextArea
                  rows={4}
                  placeholder="Введите текст…"
                  {...field}
                />
              )}
            />
            {plainErrors.text && (
              <Text type="danger">{plainErrors.text.message}</Text>
            )}

            <div style={{ marginTop: 12 }}>
              <Button type="primary" htmlType="submit" block>
                Отправить
              </Button>
            </div>
          </form>
        </Card>
      </PageContainer>
    </Wrapper>
  )
}
