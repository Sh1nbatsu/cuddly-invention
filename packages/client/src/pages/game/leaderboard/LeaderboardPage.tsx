import { useEffect, useState } from 'react'
import Wrapper from '../../../components/Wrapper'
import { CustomButton } from './Leaderboard.styled'
import { List, Avatar } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { dataSource } from './mockData'

const Leaderboard = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  const loadMoreData = () => {
    console.log('Loading more data...')
  }

  return (
    <Wrapper style={{ display: 'flex' }}>
      <div
        id="scrollableDiv"
        style={{
          height: '100vh',
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
          width: '33vw',
        }}>
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
      </div>
      <div>
        <CustomButton type="primary">Restart?</CustomButton>
      </div>
    </Wrapper>
  )
}

export default Leaderboard
