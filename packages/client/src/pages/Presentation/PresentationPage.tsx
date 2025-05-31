import { Header } from '@/components/Header/Header'
import Wrapper from '@/components/Wrapper'
import { CustomLink } from '../../components/CustomLink/CustomLink'
import {
  StyledPresentationContainer,
  StyledPresentationTitle,
  StyledPresentationSubtitle,
  StyledPresentationText,
  StyledPresentationList,
  StyledPresentationListElement,
} from './styled'

export const PresentationPage = () => {
  return (
    <Wrapper>
      <Header />

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
          <StyledPresentationListElement>
            Лидерборд
          </StyledPresentationListElement>
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
    </Wrapper>
  )
}
