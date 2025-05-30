import { PageContainer } from '@/entities/topic/topic.styled'
import { Typography } from 'antd'
import React from 'react'

const { Title } = Typography

export const TopicNotFound: React.FC = () => (
  <PageContainer>
    <Title level={3}>Тема не найдена</Title>
  </PageContainer>
)
