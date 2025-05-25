import { Spin } from 'antd'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const FullPageLoader = () => (
  <LoaderWrapper>
    <Spin size="large" />
  </LoaderWrapper>
)
