const FUN_MILESTONE_MESSAGES: Record<number, string[]> = {
  1: ['Первое очко! Путь начался.', '{n} балл! Великие дела с малого.'],
  5: ['Пять! Мал, да удал.', '{n} кликов! Разогреваемся.'],
  42: ['ЭЙ, БРАТУХА!.', '{n}! Ответ на всё.'],
  69: ['{n}! Намёк понятен.', '{n} кликов! Все улыбаются.'],
  100: ['{n}! Круглая цифра.', 'Соточка! Жаришь.'],
  200: ['{n}! Двойная сотня.', '{n} очков! Горячо.'],
  256: ['{n}! Чистый байт.', '{n}! Тут пахнет бинарщиной.'],
  333: ['{n}! Полпути до зверя.', '{n} очка! Симпатично.'],
  420: ['{n}! Перекур не помешает.', '{n} кликов! Дымится экран.'],
  500: ['{n}! Дай пять сотен.', '{n}! Полтысячи раз.'],
  555: ['{n}! Трипять.', '{n}! Красиво.'],
  666: ['{n}! Дьявол аплодирует.', '{n} очков! Адский темп.'],
  777: ['{n}! Джекпот.', '{n}! Удача с тобой.'],
  888: ['{n}! Бесконечность боком.', '{n}! Китайский успех.'],
  9000: ['{n}! It’s over {n}!', '{n}! Пробил потолок.'],
  9001: ['{n}! За гранью лимита.', '{n}! Новый рекорд силы.'],
  12345: ['{n}! Красиво выстроился строй.', '{n}! Порядок любовно.'],
  1337: ['{n}! Ты элита.', '{n} очков! Хакер одобряет.'],
  42069: ['{n}! Король мемов.', '{n}! В учебники мемологии.'],
  6969: ['{n}! Шалун.', '{n}! Забавно и мило.'],
  69696: ['{n}! Сложно, но возможно.', '{n}! Палец отваливается.'],
  99999: ['{n}! Почти 100k.', '{n}! Последний шаг.'],
  111111: ['{n}! Ровный строй.', '{n}! Шесть единиц.'],
  222222: ['{n}! Два к двум.', '{n}! Парад двоек.'],
  333333: ['{n}! Тройная сила.', '{n}! Симметрия.'],
  444444: ['{n}! Четыре в кубе.', '{n}! Квадрофония.'],
  555555: ['{n}! Полмиллиона+.', '{n}! Пятёрочный марафон.'],
  666666: ['{n}! Злой мега-чисел.', '{n}! Адовый счёт.'],
  777777: ['{n}! Слоты завидуют.', '{n}! Лаки множитель.'],
  888888: ['{n}! Счастье х8.', '{n}! Бесконечная удача.'],
  999999: ['{n}! Осталось одно очко.', '{n}! Затаи дыхание.'],
  999999999: ['Почти миллиард! Терпи.', '{n}! Вот-вот.'],
  1000000000: ['{n}! Конец игры.', 'Миллиард! Абсолютный топ.'],
}

function generateScoreMilestones(max = 1_000_000_000): number[] {
  const base: number[] = [1, 10, 100, 200]
  let v = 1000
  while (v <= max) {
    base.push(v)
    v *= 10
  }
  const specials = Object.keys(FUN_MILESTONE_MESSAGES).map(Number)
  return Array.from(new Set([...base, ...specials])).sort((a, b) => a - b)
}

export const SCORE_MILESTONES: number[] = generateScoreMilestones()

const GENERIC_PREFIXES = [
  'Ты сделал',
  'Вау',
  'Фантастика',
  'Невероятно',
  'Шедевр',
  'Браво',
  'Космос',
  'Ого',
  'Горячо',
  'Серьёзно',
]

const GENERIC_SUFFIXES = [
  'продолжай!',
  'ещё!',
  'не останавливайся!',
  'палец устал?',
  'так держать.',
  'предела нет.',
  'дуй дальше.',
  'жги!',
  'ты машина.',
  'рекорды ждут.',
]

function generateGenericBody(score: number): string {
  const p =
    GENERIC_PREFIXES[Math.floor(Math.random() * GENERIC_PREFIXES.length)]
  const s =
    GENERIC_SUFFIXES[Math.floor(Math.random() * GENERIC_SUFFIXES.length)]
  return `${p} ${score}! ${s}`
}

export function generateAchievementMessage(score: number): {
  title: string
  body: string
} {
  const custom = FUN_MILESTONE_MESSAGES[score]
  const templateArr = custom ?? [generateGenericBody(score)]
  const template = templateArr[Math.floor(Math.random() * templateArr.length)]
  const body = template.replace(/{n}/g, String(score))
  const title = `Достигнут счёт ${score}`
  return { title, body }
}

export const PURCHASE_THRESHOLDS = [1, 10, 50, 100, 500, 1000] as const

const PURCHASE_TITLES: Record<number, string[]> = {
  1: ['Первая покупка', 'Дебют сделки', 'Старт коллекции'],
  10: ['Начинающий миллионер', 'Оптовик', 'Мелкий магнат'],
  50: ['Каменный магнат', 'Знатный барыга', 'Опытный спекулянт'],
  100: ['Олигарх коллекции', 'Король рынка', 'Хозяин лавки'],
  500: ['Титан индустрии', 'Император апгрейдов', 'Сверхбогач'],
  1000: [
    'Властелин вселенной',
    'Монополист максимального уровня',
    'Абсолютный босс',
  ],
}

const PURCHASE_MILESTONE_MESSAGES: Record<number, string[]> = {
  1: ['Купил первый {upgrade}!'],
  5: ['Целых {qty} штук! Любишь прикупить.', '{qty} × {upgrade}? Шопоголик.'],
  10: ['Десяток {upgrade}! Переходим на опт.', '{qty} покупок — скидку бы.'],
  42: ['{qty} {upgrade}… Ответ найден.', 'Вселенная довольна {qty} покупками.'],
  50: ['Полсотни {upgrade}! Дела пошли.', '{qty} единиц — солидно.'],
  69: ['{qty} {upgrade}? Кхм-кхм.', '{qty}-я покупка — забавно.'],
  100: ['Сотня! {upgrade} завалили склад.', '{qty} штук — оплату картой?'],
  200: ['{qty} {upgrade}! Упаковка паллетами.', '{qty}! Серьёзный оборот.'],
  256: ['{qty} {upgrade}! Чистая бинарь.', '{qty} — IT-сердце радуется.'],
  420: ['{qty} {upgrade}! Дымится касса.', '{qty} покупок — жарко.'],
  500: ['Полтысячи {upgrade}! Ты акционер?', '{qty}! Магазин твой.'],
  666: ['{qty} {upgrade}! Сделка с тьмой?', '{qty} покупок — осторожнее.'],
  777: ['{qty} {upgrade}! Удача прет.', '{qty} покупок — казино завидует.'],
  888: ['{qty} {upgrade}! Бесконечная удача.', '{qty} — китайский успех.'],
  1000: [
    'Тысяча {upgrade}! Абсолютный контроль.',
    '{qty} покупок — монополист.',
  ],
  1337: [
    '{qty} {upgrade}! Истинный элитник.',
    '{qty} покупок — хакер одобряет.',
  ],
  4200: ['{qty} {upgrade}! Огонь.', '{qty} — дым коромыслом.'],
  9000: ['{qty} {upgrade}! It’s over {qty}!', '{qty} покупок — потолка нет.'],
}

function selectPurchaseTier(quantity: number): number {
  for (let i = PURCHASE_THRESHOLDS.length - 1; i >= 0; i--) {
    if (quantity >= PURCHASE_THRESHOLDS[i]) return PURCHASE_THRESHOLDS[i]
  }
  return PURCHASE_THRESHOLDS[0]
}

function getCustomPurchaseBody(quantity: number, upgradeName: string): string {
  const custom = PURCHASE_MILESTONE_MESSAGES[quantity]
  if (!custom) return `Купил ${quantity} × ${upgradeName}!`
  const template = custom[Math.floor(Math.random() * custom.length)]
  return template
    .replace(/{upgrade}/g, upgradeName)
    .replace(/{qty}/g, String(quantity))
}

export function generatePurchaseAchievementMessage(
  upgradeName: string,
  quantity: number
): { title: string; body: string } {
  const tier = selectPurchaseTier(quantity)
  const titles = PURCHASE_TITLES[tier]
  const title = titles[Math.floor(Math.random() * titles.length)]
  const body = getCustomPurchaseBody(quantity, upgradeName)
  return { title, body }
}
