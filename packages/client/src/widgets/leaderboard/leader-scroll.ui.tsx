import { useState, useEffect } from 'react'
import { LeaderboardResponse } from '@/shared/types/Leaderboard'
import { getLeaderboardHandler } from '@/entities/leaderboard/leaderboard.handler'
import InfiniteScroll from 'react-infinite-scroll-component'
import { List, Avatar, Button } from 'antd'
import { CustomTitle } from '@/pages/leaderboard/leaderboard.styled'

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
          <List.Item key={item.data.username}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    height: 40,
                    width: 40,
                  }}
                  src={'/'}
                  // В данный момент не буду загружать статику для аватаров, так что будет жаловаться на отсутствие поля
                />
              }
              title={<CustomTitle>{item.data.username}</CustomTitle>}
              description={item.data.date}
            />
            <Button variant="outlined">{item.data.undefScore12}</Button>
          </List.Item>
        )}
      />
    </InfiniteScroll>
  )
}
