import { List, Avatar } from 'antd'
import { dataSource } from './mockData'
import InfiniteScroll from 'react-infinite-scroll-component'
import Wrapper from '../../../components/Wrapper'
import {
  CustomButton,
  ScrollableDiv,
  NavigationDiv,
} from './Leaderboard.styled'

const Leaderboard = () => {
  const loadMoreData = () => {
    console.log('Loading more data...')
  }

  return (
    <Wrapper style={{ display: 'flex', padding: '16px' }}>
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
    </Wrapper>
  )
}

export default Leaderboard
