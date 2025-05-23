import { Header } from '@/components/Header/Header'
import Wrapper from '@/components/Wrapper'
import { PageContainer } from '@/pages/Forum/styled'
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
