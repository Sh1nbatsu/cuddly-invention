import { useCurrentUser } from '@/shared/hooks/useCurrentUser'
import { Button, Space, Typography } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const { Title, Text } = Typography

type Props = {
  children: React.ReactElement
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = useCurrentUser()
  const location = useLocation()

  if (!user?.id) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem',
        }}>
        <Space direction="vertical" size="large">
          <Title level={3}>Доступ ограничен</Title>
          <Text>Чтобы увидеть содержимое страницы, войдите в аккаунт.</Text>
          <Link to="/sign-in" state={{ from: location }}>
            <Button type="primary" size="large">
              Войти
            </Button>
          </Link>
        </Space>
      </div>
    )
  }

  return children
}
