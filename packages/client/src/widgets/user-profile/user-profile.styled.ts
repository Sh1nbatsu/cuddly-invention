import { Button } from 'antd'
import styled from 'styled-components'

export const Profile = styled.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 0 auto;
`

export const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 160px;
`

export const RightBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1890ff;
  box-shadow: 0 4px 8px rgba(24, 144, 255, 0.2);
`

export const UserName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: var(--color-primary);
`

export const UserId = styled.sup`
  font-size: 0.8rem;
  color: #666;
  font-weight: normal;
`

export const Status = styled.p<{ $online?: boolean }>`
  margin: 0;
  color: ${props => (props.$online ? '#52c41a' : '#999')};
  font-size: 0.9rem;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => (props.$online ? '#52c41a' : '#999')};
    margin-right: 6px;
  }
`

export const Bio = styled.p`
  margin: 8px 0 0;
  color: #444;
  line-height: 1.4;
`

export const Rank = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #444;
`

export const RankValue = styled.span`
  font-weight: bold;
  color: #1890ff;
  margin-left: 4px;
`

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #333;
`

export const EditButton = styled(Button)`
  && {
    border: none;
    box-shadow: none;
    color: #666;

    &:hover {
      color: #1890ff;
      background: rgba(24, 144, 255, 0.1);
    }
  }
`
