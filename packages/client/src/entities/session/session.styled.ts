import { Button, Form, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const AuthForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  background: var(--color-background-primary) !important;
  color: var(--color-text) !important;
`

export const AuthTitle = styled(Typography.Title)`
  font-size: 24px;
  text-align: center;
  color: var(--color-text) !important;
`

export const AuthSubmitButton = styled(Button)`
  margin-top: 15px;
  background: var(--color-primary) !important;
  border: 1px solid var(--color-primary) !important;
  color: var(--color-secondary);
  transition: transform 0.12s ease;

  &:hover {
    background: var(--color-primary) !important;
    border: 1px solid var(--color-primary) !important;
    color: var(--color-secondary) !important;
    transform: scale(1.05);
  }

  &[disabled] {
    background: var(--color-secondary) !important;
    border-color: var(--color-secondary) !important;
    color: var(--color-text-secondary) !important;
    transform: none;
  }

  &[data-theme='dark'] {
    background: #333 !important;
  }
`

export const AuthFooterText = styled(Typography.Text)`
  font-size: 14px;
  color: var(--color-text-secondary);
`

export const AuthLink = styled(Link)`
  color: var(--color-primary);
  &:hover {
    color: var(--color-positive);
  }
`

export const AuthSpace = styled(Space)`
  width: 100%;
  justify-content: center;
  margin-top: 16px;
`
export const LabelStyle = styled.span`
  color: var(--color-text);
`
