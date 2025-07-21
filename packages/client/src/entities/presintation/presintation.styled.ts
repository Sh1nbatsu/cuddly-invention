import { Typography } from 'antd'
import styled from 'styled-components'

export const StyledPresentationContainer = styled.div`
  display: flex;
  color: var(--color-text);
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
    color: var(--color-text);
    font-family: 'PressStart2P', monospace;
    font-size: 50px;
    margin-bottom: 0;
  }
`

export const StyledPresentationSubtitle = styled(Typography.Title)`
  && {
    color: var(--color-text);

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
  color: var(--color-text);
`

export const StyledPresentationListElement = styled.li`
  font-size: 20px;
  padding-left: 5px;
  list-style-type: disc;
  color: var(--color-text);

  &::marker {
    font-size: 12px;
  }
`

export const StyledPresentationText = styled(Typography.Text)`
  && {
    font-size: 18px;
    margin-bottom: 20px;
    color: var(--color-text);
  }
`
