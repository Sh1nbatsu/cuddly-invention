const defaultTheme = {
  token: {
    borderRadius: 6,
    backgroundBase: '#fff',
    colorBgPrimary: '#121212',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorLink: '#1677ff',
    colorPrimary: '#99BC85',
    colorSuccess: '#52c41a',
    colorTextBase: '#000',
    colorWarning: '#faad14',
    controlHeight: 32,
    fontFamily: 'Inter, sans-serif',
    fontFamilyCode: 'monospace',
    fontSize: 14,
    lineType: 'solid',
    lineWidth: 1,
  },

  components: {
    Button: {},
    Input: {},
  },
}

export const antdTheme = defaultTheme

export const styledTheme = {
  borderRadius: defaultTheme.token.borderRadius,
  colors: {
    backgroundBase: defaultTheme.token.backgroundBase,
    backgroundPrimary: defaultTheme.token.colorBgPrimary,
    error: defaultTheme.token.colorError,
    info: defaultTheme.token.colorInfo,
    link: defaultTheme.token.colorLink,
    primary: defaultTheme.token.colorPrimary,
    success: defaultTheme.token.colorSuccess,
    textBase: defaultTheme.token.colorTextBase,
    warning: defaultTheme.token.colorWarning,
  },
  controlHeight: defaultTheme.token.controlHeight,
  fontFamily: defaultTheme.token.fontFamily,
  fontFamilyCode: defaultTheme.token.fontFamilyCode,
  fontSize: defaultTheme.token.fontSize,
  lineType: defaultTheme.token.lineType,
  lineWidth: defaultTheme.token.lineWidth,
}
