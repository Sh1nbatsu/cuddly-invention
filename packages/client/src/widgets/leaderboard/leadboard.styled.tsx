import { Card, Typography } from 'antd'
import styled from 'styled-components'

const { Title, Text } = Typography

export const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;

  .ant-card-body {
    padding: 16px;
  }
`

export const RankBadge = styled.div<{ $topRank?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => (props.$topRank ? '#ffd700' : '#1890ff')};
  color: white;
  font-weight: bold;
  margin-right: 16px;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

export const ScoreBadge = styled.span`
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
`

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`

export const LeaderboardContainer = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 100%;
`

export const LeaderboardTitle = styled(Title)`
  margin-bottom: 24px !important;
  color: var(--color-text) !important;
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`

export const EndOfListMessage = styled.div`
  text-align: center;
  padding: 16px;
`

export const UserDetailsWrapper = styled.div`
  margin-left: 16px;
`

export const UserName = styled(Title)`
  margin-bottom: 0 !important;
`

export const UserLogin = styled(Text)`
  display: block;
`

export const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const ScoreLabel = styled(Text)`
  display: block;
`
