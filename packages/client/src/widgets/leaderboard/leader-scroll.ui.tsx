import { getLeaderboardHandler } from '@/entities/leaderboard/leaderboard.handler'
import { CustomTitle } from '@/pages/leaderboard/Leaderboard.styled'
import { LeaderboardResponse } from '@/shared/types/Leaderboard'
import { Avatar, Button, List } from 'antd'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export const LeaderboardWidget = () => {
  const [leaderData, setLeaderData] = useState<LeaderboardResponse>()
  const [nextCursor, setCursor] = useState(0)

  useEffect(() => {
    let ignore = false

    getLeaderboardHandler(nextCursor).then(data => {
      if (!ignore) {
        if (leaderData) {
          setLeaderData([...leaderData, ...data])
        } else {
          setLeaderData(data)
        }
        setCursor(prevCursor => prevCursor + 1)
      }
    })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <InfiniteScroll
      dataLength={20}
      next={() => getLeaderboardHandler(nextCursor)}
      hasMore={false}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have seen it all</b>
        </p>
      }
      scrollableTarget="scrollableDiv">
      <List
        dataSource={leaderData}
        renderItem={item => (
          <List.Item key={item.data.first_name}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    height: 40,
                    width: 40,
                  }}
                  src={'/'}
                  alt="pfp"
                  // В данный момент не буду загружать статику для аватаров, так что будет жаловаться на отсутствие поля
                />
              }
              title={<CustomTitle>{item.data.first_name}</CustomTitle>}
              description={item.data.login}
            />
            <Button variant="outlined">{item.data.email}</Button>
          </List.Item>
        )}
      />
    </InfiniteScroll>
  )
}
