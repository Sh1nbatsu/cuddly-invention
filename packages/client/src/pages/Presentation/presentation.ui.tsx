import { CustomLink } from '@/shared/ui/custom-link/custom-link.ui'
import {
  StyledPresentationContainer,
  StyledPresentationList,
  StyledPresentationListElement,
  StyledPresentationSubtitle,
  StyledPresentationText,
  StyledPresentationTitle,
} from './styled'

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
          Механика клика и апдейтов
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

      <CustomLink to="/game" variant="retro">
        Играть
      </CustomLink>
    </StyledPresentationContainer>
  )
}
