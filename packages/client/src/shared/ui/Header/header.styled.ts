import { WifiOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import styled from 'styled-components'

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`

export const StyledNav = styled.nav`
  display: flex;
  gap: 16px;
`

export const StyledBadge = styled(Badge)`
  & {
    display: inline-flex;
    align-items: center;
  }

  .ant-badge-count {
    background-color: #000;
    color: #000;
    box-shadow: none;
    min-width: 16px;
    height: 16px;
    font-size: 0;
    padding: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .ant-badge-count .anticon {
    font-size: 10px;
    color: #fff;
    transform: rotate(45deg);
  }
`

export const StyledBadgeIcon = styled(WifiOutlined)`
  color: #000;
  font-size: 16px;
  transform: rotate(45deg);
`
