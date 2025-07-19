import { Button } from 'antd'
import styled from 'styled-components'

const pixelShadow = '4px 4px 0 #000'

export const UpgradeButton = styled(Button)<{ $canAfford: boolean }>`
  position: relative;
  font-family: 'PressStart2P', monospace;
  border: ${({ $canAfford }) =>
    $canAfford ? '2px solid var(--color-secondary)' : '2px dashed #ccc'};
  padding: 12px 14px;
  border-radius: 0;
  cursor: ${({ $canAfford }) => ($canAfford ? 'pointer' : 'not-allowed')};
  opacity: ${({ $canAfford }) => ($canAfford ? 1 : 0.55)};
  display: flex;
  flex-direction: column;
  height: max-content;
  justify-content: center;
  background: transparent;
  gap: 6px;
  color: var(--color-text);
  line-height: 1.5;
  text-align: left;
  user-select: none;
  transition: transform 0.08s ease, box-shadow 0.08s ease;
  ${({ $canAfford }) => $canAfford && `box-shadow: ${pixelShadow};`}

  &:hover,
  &:focus {
    background: transparent !important;
    color: var(--color-text) !important;
    border-color: ${({ $canAfford }) =>
      $canAfford ? 'var(--color-secondary)' : '#ccc'} !important;
    transform: ${({ $canAfford }) =>
      $canAfford ? 'translate(2px, 2px)' : 'none'};
    ${({ $canAfford }) =>
      $canAfford && 'box-shadow: 2px 2px 0 var(--color-secondary);'}
  }

  &:active {
    background: transparent !important;
    transform: ${({ $canAfford }) => ($canAfford ? 'translate(0, 0)' : 'none')};
    color: var(--color-text) !important;
    border-color: ${({ $canAfford }) =>
      $canAfford ? 'var(--color-secondary)' : '#ccc'} !important;
  }

  &::after,
  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--color-secondary);
  }

  &::before {
    top: -2px;
    left: -2px;
  }

  &::after {
    bottom: -2px;
    right: -2px;
  }

  &:focus-visible {
    outline: none;
  }
`

export const UpgradeNameText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 0 var(--color-primary);
  color: var(--color-text);
`

export const UpgradeLevelText = styled.div`
  color: var(--color-text-secondary);
  font-size: 11px;
  white-space: nowrap;
`

export const UpgradeCostText = styled.div`
  color: var(--color-text-secondary);
  font-size: 11px;
  white-space: nowrap;
`

export const UpgradeEffectText = styled.div<{ $active: boolean }>`
  font-weight: 700;
  font-size: 11px;
  color: ${({ $active }) =>
    $active ? 'var(--color-positive)' : 'var(--color-text-secondary)'};
  white-space: nowrap;
`

export const UpgradeInfoRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  flex-wrap: wrap;
  margin: auto;
  text-align: center;
`

export const StyledUpgradeSidebar = styled.div`
  font-family: 'PressStart2P', monospace;
  max-width: 320px;
  width: 100%;
  height: 100%;
  padding: 20px 16px;
  background: repeating-linear-gradient(
    45deg,
    #fff,
    #fff 8px,
    #fafafa 8px,
    #fafafa 16px
  );
  border-right: 2px solid var(--color-primary);
  overflow-y: auto;
  box-shadow: 4px 0 0 var(--color-primary);

  [data-theme='dark'] & {
    background: repeating-linear-gradient(
      45deg,
      #1e1e1e,
      #1e1e1e 8px,
      #252525 8px,
      #252525 16px
    );
  }
`

export const StyledUpgradesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const LockedUpgradeButton = styled(Button)`
  font-family: 'PressStart2P', monospace;
  background: unset;
  border: 2px dashed #ccc;
  padding: 22px;
  border-radius: 0;
  font-size: 18px;
  font-weight: bold;
  color: #ccc;
  text-align: center;
  user-select: none;
  cursor: not-allowed;
  box-shadow: ${pixelShadow};

  &:hover,
  &:focus,
  &:active {
    background: unset !important;
    border-color: #ccc !important;
    color: #ccc !important;
    box-shadow: ${pixelShadow};
  }

  [data-theme='dark'] & {
    border-color: #444;
    color: #444;

    &:hover,
    &:focus,
    &:active {
      background: unset !important;
      border-color: #444 !important;
      color: #444 !important;
      box-shadow: ${pixelShadow};
    }
  }
`

export const StyledUpgradeBuyButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;

  button {
    font-family: 'PressStart2P', monospace;
    font-size: 11px;
    padding: 8px 14px;
    color: var(--color-primary);
    border: 2px solid var(--color-secondary);
    border-radius: 0;
    box-shadow: ${pixelShadow};
    cursor: pointer;
    transition: transform 0.08s ease, box-shadow 0.08s ease;

    &:hover {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0 var(--color-secondary);
    }

    &:active {
      transform: translate(0, 0);
    }

    &.active {
      background: var(--color-secondary);
      color: var(--color-background-primary);
      box-shadow: 2px 2px 0 var(--color-primary);
    }
  }
`
