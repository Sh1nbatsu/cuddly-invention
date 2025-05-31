import { Typography } from 'antd'
import styled from 'styled-components'

export const StyledPresentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: calc(100vh - 74px - 74px);
  border-radius: 4px;
  padding: 2rem;
`

export const StyledPresentationTitle = styled(Typography.Title)`
  && {
    font-family: 'PressStart2P', monospace;
    font-size: 50px;
    margin-bottom: 0;
  }
`

export const StyledPresentationSubtitle = styled(Typography.Title)`
  && {
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 30px;
  }

  span {
    color: #f90808;
  }
`

export const StyledPresentationList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 50px;
  text-align: start;
`

export const StyledPresentationListElement = styled.li`
  font-size: 20px;
  padding-left: 5px;
  list-style-type: disc;

  &::marker {
    content: '➤ '; // любой символ, например emoji
    font-size: 12px;
  }
`

export const StyledPresentationText = styled(Typography.Text)`
  && {
    font-size: 18px;
    margin-bottom: 20px;
  }
`
