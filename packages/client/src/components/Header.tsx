import React from 'react'
import styled from 'styled-components'
import { CustomLink } from './CustomLink/CustomLink'

interface HeaderProps {
  logo?: React.ReactNode
  navItems?: {
    to: string
    text: string
    variant?: 'primary' | 'secondary' | 'text'
  }[]
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`

const Nav = styled.nav`
  display: flex;
  gap: 16px;
`

const Header: React.FC<HeaderProps> = ({
  logo = 'Дино Кликер',
  navItems = [
    { to: '/forum', text: 'Форум' },
    { to: '/leaderboard', text: 'Таблица лидеров' },
    { to: '/sign-up', text: 'Авторизация' },
  ],
}) => (
  <HeaderContainer>
    <CustomLink to="/" variant="retro">
      {logo}
    </CustomLink>

    <Nav>
      {navItems.map((item, index) => (
        <CustomLink key={index} to={item.to} variant="retro">
          {item.text}
        </CustomLink>
      ))}
    </Nav>
  </HeaderContainer>
)

export default Header
