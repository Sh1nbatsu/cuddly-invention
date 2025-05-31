import { List, Avatar } from 'antd'
import { dataSource } from './mockData'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  CustomButton,
  ScrollableDiv,
  NavigationDiv,
  CustomWrapper,
} from './Leaderboard.styled'

import { FullscreenToggler } from '@/shared/ui/fullscreen-toggler/fullscreen-toggler.ui'

const Leaderboard = () => {
  const loadMoreData = () => {
    console.log('Loading more data...')
  }

  return (
    <CustomWrapper>
      <FullscreenToggler />
      <ScrollableDiv id="scrollableDiv">
        <InfiniteScroll
          dataLength={20}
          next={loadMoreData}
          hasMore={false}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv">
          <List
            dataSource={dataSource}
            renderItem={item => (
              <List.Item key={item.username}>
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
                  title={<p>{item.username}</p>}
                  description={item.date}
                />
                <div>
                  <h3>{item.score}</h3>
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </ScrollableDiv>
      <NavigationDiv>
        <CustomButton type="primary">Restart?</CustomButton>
        <CustomButton type="link" color="cyan" variant="solid">
          Forum
        </CustomButton>
      </NavigationDiv>
    </CustomWrapper>
  )
}

export default Leaderboard
