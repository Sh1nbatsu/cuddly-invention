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
      <Typography.Title level={2} style={{ color: 'var(--color-text)' }}>
        {config.title}
      </Typography.Title>

      <Typography.Paragraph style={{ color: 'var(--color-text)' }}>
        {config.message}
      </Typography.Paragraph>

      {config.showStatus && status != null && (
        <Typography.Paragraph style={{ color: 'var(--color-text)' }}>
          Код ошибки: <strong>{status}</strong>
        </Typography.Paragraph>
      )}

      {config.showStatusText && statusText && (
        <Typography.Text style={{ color: 'var(--color-text)' }}>
          {statusText}
        </Typography.Text>
      )}

      <CustomLink to="/" variant="retro">
        На главную
      </CustomLink>
    </PageContent>
  )
}
