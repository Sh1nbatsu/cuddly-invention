import { Card } from 'antd'
import styled from 'styled-components'

export const CommentCard = styled(Card)<{ $nested?: boolean }>`
  margin-bottom: 12px;
  ${({ $nested }) => $nested && 'margin-left: 32px;'}
`
