import { Table as AntTable } from 'antd'
import styled from 'styled-components'

const CustomTable = styled(AntTable)`
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

export { CustomTable }
