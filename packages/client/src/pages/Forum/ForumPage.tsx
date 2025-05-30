import { DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Layout, List, Modal, Typography } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { FormInput } from '@/shared/ui/form-input/form-input.ui'
import { addTopic, deleteTopic, Topic, topics } from './forumData'

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

const TitleStyled = styled(Title)`
  margin-bottom: 24px !important;
`

const CardContainer = styled(Card)`
  margin-top: 40px;
`

interface NewTopic {
  title: string
  text: string
}

export const ForumPage: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<Topic[]>([...topics])

  const { control, handleSubmit, reset } = useForm<NewTopic>()

  const refresh = () => setData([...topics])

  const create = (v: NewTopic) => {
    addTopic(v.title.trim(), v.text.trim())
    refresh()
    reset()
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
    <PageContainer as="main">
      <TitleStyled level={2}>Форум</TitleStyled>

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

      <CardContainer title="Создать тему">
        <form onSubmit={handleSubmit(create)}>
          <FormInput
            control={control}
            name="title"
            label="Заголовок"
            rules={{ required: 'Введите заголовок темы' }}
            inputProps={{ placeholder: 'Заголовок темы' }}
          />
          <FormInput
            control={control}
            name="text"
            label="Содержимое темы"
            inputProps={{ placeholder: 'Содержимое темы' }}
            rules={{ required: 'Введите содержимое темы' }}
          />
          <div style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" block>
              Создать
            </Button>
          </div>
        </form>
      </CardContainer>
    </PageContainer>
  )
}

export default ForumPage
