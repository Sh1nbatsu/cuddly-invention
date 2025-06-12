import { List, Avatar } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  ScrollableDiv,
  NavigationDiv,
  CustomWrapper,
  CustomButton,
  CustomTitle,
} from './Leaderboard.styled'

import { FullscreenToggler } from '@/shared/ui/fullscreen-toggler/fullscreen-toggler.ui'
import { getLeaderboardHandler } from '@/entities/leaderboard/leaderboard.handler'
import { LeaderboardResponse } from '@/shared/types/Leaderboard'
import { useEffect, useState } from 'react'

const Leaderboard = () => {
  const [leaderData, setLeaderData] = useState<LeaderboardResponse>()

  let currCursor = 0

  const fetchLeaderboard = async (cursor: number) => {
    const data = await getLeaderboardHandler(cursor)
    setLeaderData(data)
    currCursor += 1
    console.log('loading')
    return
  }

  useEffect(() => {
    fetchLeaderboard(currCursor)
  }, [])

  return (
    <CustomWrapper>
      <FullscreenToggler />
      <ScrollableDiv id="scrollableDiv">
        <InfiniteScroll
          dataLength={20}
          next={() => fetchLeaderboard(currCursor)}
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
                  title={<p>{item.data.username}</p>}
                  description={item.data.date}
                />
                <div>
                  <h3>{item.data.undefScore12}</h3>
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </ScrollableDiv>
      <NavigationDiv>
        <CustomButton variant="retro">Ещё раз?</CustomButton>
      </NavigationDiv>
    </CustomWrapper>
  )
}

export default Leaderboard
