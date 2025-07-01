import { List, Typography } from 'antd'
import styled from 'styled-components'

export const StyledTopicCard = styled(List.Item)`
  display: flex;
  flex-direction: column;
  padding: 20px 28px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  margin-bottom: 16px;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
    background-color: #f9fafb;
  }
`

export const StyledTopicCardTitle = styled(Typography.Title).attrs({
  level: 4,
})`
  margin: 0 !important;
  font-weight: 700;
  color: #111827;
`

export const StyledTopicCardMeta = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  margin-top: 12px;
  color: #6b7280;
  font-size: 14px;
  align-items: center;
`

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const IconStyled = styled.span`
  color: #9ca3af;
  font-size: 16px;
`

const { Text, Paragraph } = Typography

export const CommentContainer = styled.div`
  padding: 12px 16px;
  margin-top: 8px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
`

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`

export const CommentAuthor = styled(Text)`
  font-weight: 600;
`

export const CommentDate = styled(Text)`
  color: #888;
  font-size: 12px;
`

export const CommentContent = styled(Paragraph)`
  margin: 0;
  white-space: pre-wrap;
`

export const RepliesContainer = styled.div`
  margin-left: 24px;
  margin-top: 8px;
`
