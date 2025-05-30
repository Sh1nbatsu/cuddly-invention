import { ReactNode } from 'react'
import { LinkProps, useLocation } from 'react-router-dom'
import { StyledLink } from './custom-link.styled'

type LinkVariant = 'default' | 'retro'

interface CustomLinkProps extends Omit<LinkProps, 'className'> {
  children: ReactNode
  variant?: LinkVariant
  disabled?: boolean
}

export const CustomLink = ({
  children,
  variant = 'default',
  disabled = false,
  to,
  ...rest
}: CustomLinkProps) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <StyledLink
      to={to}
      $variant={variant}
      $disabled={disabled}
      $active={isActive}
      {...rest}>
      {children}
    </StyledLink>
  )
}
