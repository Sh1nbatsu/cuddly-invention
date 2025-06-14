export const FUN_MILESTONE_MESSAGES: Record<number, string[]> = {
  1: ['Первое очко! Путь начался.', '{n} балл! Великие дела с малого.'],
  1000: ['{n}! Тысяча очков! Впечатляет.', 'Тысяча — новый уровень!'],
  1000000: ['{n}! Миллион! Невероятно.', 'Шаг в миллион!'],
  1000000000: ['{n}! Миллиард! Абсолютный рекорд.', 'Ты в миллиардном клубе!'],
}

export const PURCHASE_THRESHOLDS = [1, 100, 1000] as const

export const PURCHASE_TITLES: Record<number, string[]> = {
  1: ['Первая покупка', 'Дебют сделки'],
  100: ['Оптовый игрок', 'Крупный заказчик'],
  1000: ['Монополист', 'Абсолютный босс'],
}

export const PURCHASE_MILESTONE_MESSAGES: Record<number, string[]> = {
  1: ['Купил первый {upgrade}!'],
  100: ['{qty} × {upgrade}? Масштабно!', 'Сотня {upgrade}!'],
  1000: ['Тысяча {upgrade}! Невероятный объем.', '{qty} штук — монополист.'],
}

export const GENERIC_PREFIXES = ['Вау', 'Невероятно', 'Шедевр', 'Браво', 'Ого']

export const GENERIC_SUFFIXES = [
  'продолжай!',
  'не останавливайся!',
  'так держать.',
  'рекорды ждут.',
]
