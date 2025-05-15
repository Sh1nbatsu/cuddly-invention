import React from 'react'
import styled from 'styled-components'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Typography } from 'antd'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import CustomLink from '@/components/CustomLink'
import { ErrorConfig } from '@/config/errorConfig'

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  height: calc(100vh - 148px);
`

const Content = styled.div`
  max-width: 480px;
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.staticBackground};
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.primary};
  box-shadow: 4px 4px ${({ theme }) => theme.primary};
  font-weight: 600;
`

export interface ErrorPageProps {
  config: ErrorConfig
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ config }) => {
  const error = useRouteError()
  const isRouteError = isRouteErrorResponse(error)
  const status = isRouteError ? error.status : undefined
  const statusText = isRouteError ? error.statusText : undefined

  return (
    <Wrapper>
      <Header />
      <Page>
        <Content>
          <Typography.Title level={2}>{config.title}</Typography.Title>
          <Typography.Paragraph>{config.message}</Typography.Paragraph>
          {config.showStatus && status != null && (
            <Typography.Paragraph>
              Код ошибки: <strong>{status}</strong>
            </Typography.Paragraph>
          )}
          {config.showStatusText && statusText && (
            <Typography.Text>{statusText}</Typography.Text>
          )}
          <CustomLink to="/" variant="retro">
            На главную
          </CustomLink>
        </Content>
      </Page>
    </Wrapper>
  )
}
