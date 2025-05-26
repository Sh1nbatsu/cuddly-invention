import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

type LinkVariant = 'default' | 'retro'

interface StyledLinkProps {
  $variant: LinkVariant
  $disabled: boolean
  $active: boolean
}

export const StyledLink = styled(Link)<StyledLinkProps>`
  color: var(--color-primary);
  text-decoration: none;
  cursor: pointer;
  font-family: 'PressStart2P', monospace;
  transition: all 0.2s ease;
  user-select: none;

  ${({ $variant }) =>
    $variant === 'retro' &&
    css`
      background-color: white;
      padding: 8px 12px;
      border-radius: 4px;
      border: 2px solid var(--color-primary);
      box-shadow: 4px 4px var(--color-primary);
      font-weight: 600;
      display: inline-block;

      &:hover {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px var(--color-primary);
      }
    `}

  ${({ $active }) =>
    $active &&
    css`
      font-weight: bold;
      text-decoration: underline;
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
      text-decoration: none;
    `}
`
