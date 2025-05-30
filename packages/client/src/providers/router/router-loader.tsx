import { Spin } from 'antd'
import { RouterLoaderWrapper } from './router-loader.styled'

export const RouterLoader = () => (
  <RouterLoaderWrapper>
    <Spin size="large" />
  </RouterLoaderWrapper>
)
