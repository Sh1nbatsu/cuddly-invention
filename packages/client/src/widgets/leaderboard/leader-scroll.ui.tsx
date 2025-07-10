import { useScore } from '@/entities/game/model/hooks/useScore'
import { updateLeaderApi } from '@/entities/leaderboard/leaderboard.api'
import { getLeaderboardHandler } from '@/entities/leaderboard/leaderboard.handler'
import { User } from '@/shared/types/User'
import { Avatar, Button, List, message, Space, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import {
  EndOfListMessage,
  LeaderboardContainer,
  LeaderboardTitle,
  LoadingWrapper,
  LoadMoreWrapper,
  RankBadge,
  ScoreBadge,
  ScoreLabel,
  ScoreWrapper,
  StyledCard,
  UserDetailsWrapper,
  UserInfo,
  UserLogin,
  UserName,
} from './leadboard.styled'
const { Text } = Typography
const PAGE_SIZE = 10

export const LeaderboardWidget = () => {
  const [leaderData, setLeaderData] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [score] = useScore()

  const loadMoreData = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const { rows, count } = await getLeaderboardHandler(
        currentPage * PAGE_SIZE
      )
      await updateLeaderApi({ count: score })
      setLeaderData(prev => {
        const newData = [...prev, ...rows]
        return newData.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              t => t.login === item.login && t.email === item.email
            )
        )
      })

      setCurrentPage(prev => prev + 1)
      setHasMore(leaderData.length + rows.length < count)
    } catch (error) {
      message.error('Ошибка при получении списка рекордов :(')
      console.error('Leaderboard loading error:', error)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  const handleLoadMore = () => {
    loadMoreData()
  }

  if (initialLoading) {
    return (
      <LoadingWrapper>
        <Spin size="large" />
      </LoadingWrapper>
    )
  }

  return (
    <LeaderboardContainer>
      <LeaderboardTitle level={3}>🏆 Leaderboard</LeaderboardTitle>

      <List
        dataSource={Array.from(new Set(leaderData))}
        renderItem={(item: User, index) => (
          <StyledCard hoverable>
            <List.Item key={`${item.login}-${item.email}-${index}`}>
              <UserInfo>
                <RankBadge $topRank={index < 3}>{index + 1}</RankBadge>
                <Avatar size={48} src={item.avatar || '/'} alt="User avatar" />
                <UserDetailsWrapper>
                  <UserName level={5}>
                    {item.first_name} {item.second_name}
                  </UserName>
                  <UserLogin type="secondary">@{item.login}</UserLogin>
                </UserDetailsWrapper>
              </UserInfo>

              <Space size="large">
                <ScoreWrapper>
                  <ScoreLabel type="secondary">Score</ScoreLabel>
                  <ScoreBadge>{item.score || 0}</ScoreBadge>
                </ScoreWrapper>
              </Space>
            </List.Item>
          </StyledCard>
        )}
      />

      {hasMore && (
        <LoadMoreWrapper>
          <Button
            type="primary"
            onClick={handleLoadMore}
            loading={loading}
            disabled={loading}>
            Загрузить еще
          </Button>
        </LoadMoreWrapper>
      )}

      {!hasMore && leaderData.length > 0 && (
        <EndOfListMessage>
          <Text type="secondary">Вы достигли конца списка</Text>
        </EndOfListMessage>
      )}
    </LeaderboardContainer>
  )
}
