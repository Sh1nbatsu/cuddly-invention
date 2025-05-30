import { ErrorConfig } from './error.types'

export const PAGE_ERROR: ErrorConfig = {
  title: 'Упс! Не удалось загрузить страницу',
  message: 'Попробуйте обновить страницу или зайти немного позже.',
  showStatus: true,
  showStatusText: true,
}

export const NOT_FOUND_ERROR: ErrorConfig = {
  title: '404 — Страница не найдена',
  message: 'К сожалению, мы не нашли то, что вы искали.',
  showStatus: false,
  showStatusText: false,
}
