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
