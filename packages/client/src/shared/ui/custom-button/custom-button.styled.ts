import styled, { css } from 'styled-components'

interface StyledButtonProps {
  $variant: 'default' | 'retro'
  $active: boolean
  disabled?: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  border-radius: 6px;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;

  ${({ $variant }) =>
    $variant === 'retro' &&
    css`
      background-color: white;
      padding: 8px 12px;
      border-radius: 4px;
      border: 2px solid var(--color-secondary);
      box-shadow: 4px 4px var(--color-secondary);
      font-weight: 600;

      &:hover:not(:disabled) {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px var(--color-secondary);
      }
    `}

  ${({ $variant, $active }) =>
    $variant === 'retro' &&
    $active &&
    css`
      transform: translate(2px, 2px);
      box-shadow: 2px 2px var(--color-secondary);
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`
