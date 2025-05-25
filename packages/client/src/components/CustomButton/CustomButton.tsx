import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './CustomButton.module.css'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'retro'
  active?: boolean
}

export const CustomButton = ({
  children,
  variant = 'default',
  active = false,
  ...rest
}: CustomButtonProps) => {
  const className = [
    styles.button,
    styles[variant],
    active ? styles.active : '',
  ].join(' ')

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  )
}
