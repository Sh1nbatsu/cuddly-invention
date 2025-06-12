// styled.d.ts
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: number
    colors: {
      backgroundBase: string
      backgroundPrimary: string
      error: string
      info: string
      link: string
      primary: string
      success: string
      textBase: string
      warning: string
    }
    controlHeight: number
    fontFamily: string
    fontFamilyCode: string
    fontSize: number
    lineType: string
    lineWidth: number
  }
}
