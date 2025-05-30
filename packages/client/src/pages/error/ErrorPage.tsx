import { ErrorConfig } from '@/config/errorConfig'
import { CustomLink } from '@/shared/ui/custom-link/custom-link.ui'
import { Typography } from 'antd'
import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import styled from 'styled-components'

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
  background: ${({ theme }) => theme.token.colorBgBase};
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.token.colorBgPrimary};
  box-shadow: 4px 4px ${({ theme }) => theme.token.colorBgPrimary};
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
  )
}
