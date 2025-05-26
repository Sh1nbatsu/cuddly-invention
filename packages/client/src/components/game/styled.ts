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
// ---- SidebarUpgrades ----

export const StyledSidebar = styled.div`
  max-width: 320px;
  width: 100%;
  max-height: -webkit-fill-available;
  padding: 12px;
  border-right: 2px solid var(--color-primary);
  overflow: auto;
`

export const StyledBuyButtonsContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
`

export const StyledUpgradesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const LockedUpgradeButton = styled.button`
  background: #fff;
  border: 1px dashed #ccc;
  padding: 16px;
  border-radius: 6px;
  opacity: 0.5;
  font-size: 24px;
  font-weight: bold;
  user-select: none;
  cursor: not-allowed;
`

export const UpgradeButton = styled.button<{ $canAfford: boolean }>`
  background: #fff;
  border: ${({ $canAfford }) =>
    $canAfford ? '1px solid var(--color-primary)' : '1px dashed #ccc'};
  padding: 8px;
  border-radius: 6px;
  text-align: left;
  cursor: ${({ $canAfford }) => ($canAfford ? 'pointer' : 'not-allowed')};
  opacity: ${({ $canAfford }) => ($canAfford ? 1 : 0.5)};
  transition: border-color 0.3s ease;
`

export const UpgradeLevelText = styled.div`
  font-size: 12px;
  color: #666;
`

export const UpgradeCostText = styled.div`
  font-size: 12px;
  color: #666;
`

export const UpgradeEffectText = styled.div<{ $active: boolean }>`
  font-size: 12px;
  color: ${({ $active }) => ($active ? '#007700' : '#666')};
`
