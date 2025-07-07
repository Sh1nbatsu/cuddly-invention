import { getLeaderboardHandler } from '@/entities/leaderboard/leaderboard.handler'
import { User } from '@/shared/types/User'
import { Avatar, Button, Card, List, message, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'

const { Title, Text } = Typography

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;

  .ant-card-body {
    padding: 16px;
  }
`

const RankBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1890ff;
  color: white;
  font-weight: bold;
  margin-right: 16px;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

const ScoreBadge = styled.span`
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
`

export const LeaderboardWidget = () => {
  const [leaderData, setLeaderData] = useState<User[]>([])
  const [nextCursor, setNextCursor] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreData = async () => {
    try {
      const { rows, count } = await getLeaderboardHandler(nextCursor)
      setLeaderData(prev => [...prev, ...rows])
      setNextCursor(prev => prev + 1)
      setHasMore(count > leaderData.length)
    } catch (error) {
      message.error('Ошибка при получении списка рекордов :(')
      setHasMore(false)
    }
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <div style={{ padding: '24px', width: '100%', maxWidth: '100%' }}>
      <Title level={3} style={{ marginBottom: '24px' }}>
        🏆 Leaderboard
      </Title>

      <InfiniteScroll
        dataLength={leaderData.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <Text type="secondary">Loading more users...</Text>
          </div>
        }
        endMessage={
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <Text strong>You've reached the end of the leaderboard</Text>
          </div>
        }>
        <List
          dataSource={leaderData}
          renderItem={(item: User, index) => (
            <StyledCard hoverable>
              <List.Item key={`${item.login}-${item.email}`}>
                <UserInfo>
                  <RankBadge>{index + 1}</RankBadge>
                  <Avatar
                    size={48}
                    src={item.avatar || '/default-avatar.png'}
                    alt="User avatar"
                  />
                  <div style={{ marginLeft: '16px' }}>
                    <Title level={5} style={{ marginBottom: 0 }}>
                      {item.first_name} {item.second_name}
                    </Title>
                    <Text type="secondary">@{item.login}</Text>
                  </div>
                </UserInfo>

                <Space size="large">
                  <div>
                    <Text type="secondary">Score</Text>
                    <div>
                      <ScoreBadge>{item.score || 0}</ScoreBadge>
                    </div>
                  </div>
                  <Button type="link" href={`mailto:${item.email}`}>
                    Contact
                  </Button>
                </Space>
              </List.Item>
            </StyledCard>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}
