import { CustomButton as RetroButton } from '@/shared/ui/custom-button/custom-button.ui'
import styled from 'styled-components'

export const CustomButton = styled(RetroButton)`
  &&& {
    width: 200px;
    height: 60px;
    font-size: 20px;
    font-weight: 500;
    font-family: 'PressStart2P', monospace;
    background-color: rgb(186, 255, 217);
  }
`

export const ScrollableDiv = styled.div`
  height: calc(100vh - 98px);
  overflow: auto;
  padding: 0 16px;
  border: 1px solid rgba(140, 140, 140, 0.35);
  max-width: 100%;
  width: 100%;
`

export const NavigationDiv = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const CustomWrapper = styled.div`
  display: flex;
  padding: 16px;
  height: 90vh;
`

export const CustomTitle = styled.p`
  &&& {
    font-weight: 700;
  }
`
