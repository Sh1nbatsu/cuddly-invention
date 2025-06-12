import styled from 'styled-components'

export const PageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  height: calc(100vh - 148px);
  max-width: 480px;
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.backgroundBase};
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};
  box-shadow: 4px 4px ${({ theme }) => theme.colors.backgroundPrimary};
  font-weight: 600;
`
