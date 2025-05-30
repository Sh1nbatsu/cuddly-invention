import { Header } from '@/components/Header/Header'
import Wrapper from '@/components/Wrapper'
import { PageContainer } from '@/pages/forum/styled'
import { Typography } from 'antd'
import React from 'react'

const { Title } = Typography

export const TopicNotFound: React.FC = () => (
  <Wrapper>
    <Header />
    <PageContainer>
      <Title level={3}>Тема не найдена</Title>
    </PageContainer>
  </Wrapper>
)
