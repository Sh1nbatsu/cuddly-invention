import { Button, Form, Typography } from 'antd'
import styled from 'styled-components'

export const AuthForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  min-height: 100vh;
`

export const AuthTitle = styled(Typography.Title)`
  font-size: 24px;
  text-align: center;
`

export const AuthSubmitButton = styled(Button)`
  margin-top: 15px;
`
