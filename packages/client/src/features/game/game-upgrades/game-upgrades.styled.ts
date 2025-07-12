import styled from 'styled-components'

export const UpgradeButton = styled.button<{ $canAfford: boolean }>`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: ${({ $canAfford }) =>
    $canAfford ? '1px solid var(--color-secondary)' : '1px dashed #ccc'};
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

export const StyledUpgradeSidebar = styled.div`
  max-width: 320px;
  width: 100%;
  max-height: -webkit-fill-available;
  padding: 12px;
  border-right: 2px solid #ccc;
  overflow: auto;
  color: #121212;
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

export const StyledUpgradeBuyButtonsContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
`
