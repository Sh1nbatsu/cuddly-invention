import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    token: {
      borderRadius: number
      colorBgBase: string
      colorBgPrimary: string
      colorError: string
      colorInfo: string
      colorLink: string
      colorPrimary: string
      colorSuccess: string
      colorTextBase: string
      colorWarning: string
      controlHeight: number
      fontFamily: string
      fontFamilyCode: string
      fontSize: number
      lineType: 'solid' | 'dashed' | 'dotted' | string
      lineWidth: number
    }
    components: {
      Button: Record<string, unknown>
      Input: Record<string, unknown>
    }
  }
}
