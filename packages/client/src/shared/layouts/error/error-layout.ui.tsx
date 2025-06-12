import { useClient } from '@/shared/hooks/useClient'
import { CustomLink } from '@/shared/ui/custom-link/custom-link.ui'
import { Typography } from 'antd'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { PageContent } from './error.styled'
import { ErrorConfig } from './error.types'

export interface ErrorLayoutProps {
  config: ErrorConfig
}

export const ErrorLayout = ({ config }: ErrorLayoutProps) => {
  const mountedClient = useClient()

  const error = useRouteError()
  const isRouteError = isRouteErrorResponse(error)
  const status = isRouteError ? error.status : undefined
  const statusText = isRouteError ? error.statusText : undefined

  if (!mountedClient) {
    return null
  }

  return (
    <PageContent>
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
    </PageContent>
  )
}
