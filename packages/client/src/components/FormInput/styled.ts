import { Form, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 5px;
  width: 100%;
`

export const AuthFooterText = styled(Typography.Text)`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
`

export const AuthLink = styled(Link)`
  color: #1890ff;
  &:hover {
    color: #40a9ff;
  }
`

export const AuthSpace = styled(Space)`
  width: '100%';
  justify-content: 'center';
  margin-top: '16px';
`
