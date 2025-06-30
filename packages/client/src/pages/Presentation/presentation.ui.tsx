import {
  StyledPresentationContainer,
  StyledPresentationList,
  StyledPresentationListElement,
  StyledPresentationSubtitle,
  StyledPresentationText,
  StyledPresentationTitle,
} from '@/entities/presintation/presintation.styled'

import { CustomLink } from '@/shared/ui/custom-link/custom-link.ui'

export const PresentationPage = () => {
  return (
    <StyledPresentationContainer>
      <StyledPresentationTitle>Дино Кликер</StyledPresentationTitle>
      <StyledPresentationSubtitle>
        Учебный проект студентов <span>Я</span>.Практикума
      </StyledPresentationSubtitle>
      <StyledPresentationSubtitle>Что внутри?</StyledPresentationSubtitle>

      <StyledPresentationList>
        <StyledPresentationListElement>
          Механика клика и апгрейдов
        </StyledPresentationListElement>
        <StyledPresentationListElement>
          Авторизация и регистрация
        </StyledPresentationListElement>
        <StyledPresentationListElement>Лидерборд</StyledPresentationListElement>
        <StyledPresentationListElement>Форум</StyledPresentationListElement>
      </StyledPresentationList>

      <StyledPresentationText>
        Нажимай на кнопку, зарабатывай очки и получай возможность пассивного
        фарма очков, благодаря покупке улучшений!
      </StyledPresentationText>

      <CustomLink to="/" variant="retro">
        Играть
      </CustomLink>
    </StyledPresentationContainer>
  )
}
