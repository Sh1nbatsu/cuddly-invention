import React from 'react'
import { Typography } from 'antd'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import { PageContainer } from '@/pages/Forum/styled'

const { Title } = Typography

export const TopicNotFound: React.FC = () => (
  <Wrapper>
    <Header />
    <PageContainer>
      <Title level={3}>Тема не найдена</Title>
    </PageContainer>
  </Wrapper>
)
