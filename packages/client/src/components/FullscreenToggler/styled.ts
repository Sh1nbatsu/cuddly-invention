import styled from 'styled-components'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export const FullscreenButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.1s;
  box-shadow: none;
`
// Box shadow можно заменить если нужно выделить кнопку

export const FullscreenOpen = styled(FullscreenOutlined)`
  height: 32px;
  width: 32px;
  font-size: 32px;
`

export const FullscreenClose = styled(FullscreenExitOutlined)`
  height: 32px;
  width: 32px;
  font-size: 32px;
`
