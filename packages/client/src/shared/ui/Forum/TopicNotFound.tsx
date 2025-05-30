import { PageContainer } from '@/pages/forum/styled'
import { Typography } from 'antd'
import React from 'react'

const { Title } = Typography

export const TopicNotFound: React.FC = () => (
  <PageContainer>
    <Title level={3}>Тема не найдена</Title>
  </PageContainer>
)
