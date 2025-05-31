import { ErrorLayout } from '@/shared/layouts/error/error-layout.ui'
import { PAGE_ERROR } from '@/shared/layouts/error/error.config'
import { PresentationPage } from './presentation.ui'

export const presentationRoute = {
  path: '/presentation',
  element: <PresentationPage />,
  errorElement: <ErrorLayout config={PAGE_ERROR} />,
}
