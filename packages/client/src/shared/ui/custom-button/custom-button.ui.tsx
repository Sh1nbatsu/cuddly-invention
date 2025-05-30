import { ButtonHTMLAttributes, ReactNode } from 'react'
import { StyledButton } from './custom-button.styled'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'retro'
  active?: boolean
}

export const CustomButton = ({
  children,
  variant = 'default',
  active = false,
  disabled,
  ...rest
}: CustomButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $active={active}
      disabled={disabled}
      {...rest}>
      {children}
    </StyledButton>
  )
}
