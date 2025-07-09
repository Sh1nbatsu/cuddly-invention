import { Card, Layout, Typography } from 'antd'
import styled from 'styled-components'
const { Content } = Layout

export const PageContainer = styled(Content)`
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`

export const CommentCard = styled(Card)<{ $nested?: boolean }>`
  margin-bottom: 12px;
  ${({ $nested }) => $nested && 'margin-left: 32px;'}
`

export const TopActions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

export const StyledForumTitle = styled(Typography.Title)`
  margin-bottom: 24px !important;
`

export const StyledForumPageContainer = styled(Layout.Content)`
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`
