import React, { ReactNode } from 'react'
import { StyledPageWrapper } from './page-wrapper.styled'

interface PageWrapperProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const PageWrapper = ({
  children,
  className = '',
  style = {},
}: PageWrapperProps) => {
  return (
    <StyledPageWrapper className={`container ${className}`} style={style}>
      {children}
    </StyledPageWrapper>
  )
}
