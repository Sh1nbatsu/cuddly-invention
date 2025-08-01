import { Button, Typography } from 'antd'
import styled, { keyframes } from 'styled-components'

const jump = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`

export const StyledGameWrapper = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1300;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  font-family: 'PressStart2P', monospace;
  font-size: 12px;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.5s ease, visibility 0.5s ease;
  user-select: none;
`

export const StyledGameImage = styled.img`
  width: 100px;
  height: 100px;
  animation: ${jump} 1s ease-in-out infinite;
  cursor: pointer;
`

export const StyledGameTitle = styled(Typography.Title)`
  && {
    cursor: pointer;
    font-family: 'PressStart2P', monospace;
    font-size: 16px;
    color: var(--color-text);
  }
`

export const StyledGameButton = styled(Button)`
  && {
    font-family: 'PressStart2P', monospace;
    font-size: 14px;
    cursor: pointer;
    color: #1890ff;
    text-decoration: underline;

    &:hover {
      color: #40a9ff;
    }
  }
`
