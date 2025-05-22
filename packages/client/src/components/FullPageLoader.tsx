import { Spin } from 'antd'

export const FullPageLoader = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
    <Spin size="large" />
  </div>
)
