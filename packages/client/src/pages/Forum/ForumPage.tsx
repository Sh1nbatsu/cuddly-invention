// ForumPage.tsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Layout,
  Typography,
  List,
  Card,
  Form,
  Input,
  Button,
  Modal,
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import { topics, addTopic, deleteTopic, Topic } from './forumData'

const { Content } = Layout
const { Title, Text } = Typography
const { confirm } = Modal

const PageContainer = styled(Content)`
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`

const ClickableLink = styled(Link)`
  display: block;
`

const DeleteButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
`

export const ForumPage: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<Topic[]>([...topics])

  const refresh = () => setData([...topics])

  const create = (v: { title: string; text: string }) => {
    addTopic(v.title.trim(), v.text.trim())
    refresh()
  }

  const askDelete = (id: number) => {
    confirm({
      title: 'Удалить тему?',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        deleteTopic(id)
        refresh()
        navigate('/forum')
      },
    })
  }

  return (
    <Wrapper>
      <Header />
      <PageContainer as="main">
        <Title level={2} style={{ marginBottom: 24 }}>
          Форум
        </Title>

        <List
          itemLayout="vertical"
          dataSource={data}
          locale={{ emptyText: 'Тем нет' }}
          renderItem={t => (
            <List.Item key={t.id} style={{ position: 'relative' }}>
              <DeleteButton
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => askDelete(t.id)}
              />
              <ClickableLink to={`/forum/${t.id}`}>
                <Card hoverable>
                  <Title level={4} style={{ margin: 0 }}>
                    {t.title}
                  </Title>
                  <Text type="secondary">
                    Автор — {t.author} | {t.date}
                  </Text>
                </Card>
              </ClickableLink>
            </List.Item>
          )}
        />

        <Card title="Создать тему" style={{ marginTop: 40 }}>
          <Form layout="vertical" onFinish={create}>
            <Form.Item
              name="title"
              label="Заголовок"
              rules={[{ required: true, message: 'Введите заголовок' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="text"
              label="Текст"
              rules={[{ required: true, message: 'Введите содержимое' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Создать
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    </Wrapper>
  )
}
