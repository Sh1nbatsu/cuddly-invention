import { useEffect, useState } from 'react'
import { List, Avatar } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { dataSource } from './mockData'
import Wrapper from '../../../components/Wrapper'
import { CustomButton } from './Leaderboard.styled'
import { ScrollableDiv } from './Leaderboard.styled'
import { NavigationDiv } from './Leaderboard.styled'

const Leaderboard = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

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
                      src={item.avatar}
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
