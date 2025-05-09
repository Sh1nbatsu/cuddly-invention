import { Table as AntTable } from 'antd'
import { Button as AntButton } from 'antd'
import styled from 'styled-components'

export const CustomTable = styled(AntTable)`
  &&& {
    width: 40%;
  }

  .ant-spin-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }

  .ant-pagination {
    align-self: flex-start;
  }
`

export const CustomButton = styled(AntButton)`
  &&& {
    width: 160px;
    height: 60px;
    font-size: 20px;
    font-weight: 500;
  }
`

export const ScrollableDiv = styled.div`
  height: calc(100vh - 32px);
  overflow: auto;
  padding: 0 16px;
  border: 1px solid rgba(140, 140, 140, 0.35);
  width: 33vw;
`

export const NavigationDiv = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
