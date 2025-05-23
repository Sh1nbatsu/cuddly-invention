import styled from 'styled-components'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

export const FullscreenButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
`

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
