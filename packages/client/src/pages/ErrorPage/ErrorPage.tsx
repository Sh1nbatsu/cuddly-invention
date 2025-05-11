import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { ErrorConfig } from '@/config/errorConfig'
import Wrapper from '@/components/Wrapper'
import Header from '@/components/Header'
import CustomLink from '@/components/CustomLink'
import './ErrorPage.css'

interface ErrorPageProps {
  config: ErrorConfig
}

const ErrorPage: React.FC<ErrorPageProps> = ({ config }) => {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : undefined
  const statusText = isRouteErrorResponse(error) ? error.statusText : undefined

  return (
    <Wrapper>
      <Header />

      <div className="error-page">
        <div className="error-page__content">
          <h1 className="error-page__title">{config.title}</h1>
          <p className="error-page__message">{config.message}</p>

          {config.showStatus && status != null && (
            <p className="error-page__status">
              Код ошибки: <strong>{status}</strong>
            </p>
          )}
          {config.showStatusText && statusText && (
            <p className="error-page__status-text">{statusText}</p>
          )}

          <CustomLink to="/" variant="retro">
            На главную
          </CustomLink>
        </div>
      </div>
    </Wrapper>
  )
}

export default ErrorPage
