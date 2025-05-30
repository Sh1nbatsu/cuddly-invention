import { useForumLogic } from '@/entities/forum/forum.hooks'
import { Topic } from '@/shared/types/Topic'
import { DeleteOutlined } from '@ant-design/icons'
import { Card, List, Typography } from 'antd'
import { ClickableLink, DeleteButton } from './forum-list.styled'

interface ForumListProps {
  dataSource: Topic[]
}

export const ForumList = ({ dataSource }: ForumListProps) => {
  const { handleDeleteTheme } = useForumLogic()
  return (
    <List
      itemLayout="vertical"
      dataSource={dataSource}
      locale={{ emptyText: 'Тем нет' }}
      renderItem={t => (
        <List.Item key={t.id} style={{ position: 'relative' }}>
          <DeleteButton
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTheme(t.id)}
          />
          <ClickableLink to={`/forum/${t.id}`}>
            <Card hoverable>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {t.title}
              </Typography.Title>
              <Typography.Text type="secondary">
                Автор — {t.author} | {t.date}
              </Typography.Text>
            </Card>
          </ClickableLink>
        </List.Item>
      )}
    />
  )
}
