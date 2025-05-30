import type { ForumComment, StoredData } from '@/shared/types/Forum'
import { Topic } from '@/shared/types/Topic'

const LS_KEY = 'forumData'

const now = () =>
  new Date().toLocaleString('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomElement = <T>(arr: T[]): T => arr[randomInt(0, arr.length - 1)]

const saveToLS = (data: StoredData) =>
  localStorage.setItem(LS_KEY, JSON.stringify(data))

const loadFromLS = (): StoredData | null => {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as StoredData) : null
  } catch (e) {
    console.warn(
      '[forumData] Некорректные данные в localStorage, перегенерирую…'
    )
    return null
  }
}

const users = [
  'ClickGod',
  'TapMaster3000',
  'AutoClickEnjoyer',
  'FingerBreaker',
  'CPS_Overlord',
  'NoLifeClicks',
  'RookieClicker',
  'GrandmaWithMacro',
  'BanHammer',
  'ModeratorLurker',
  'SecretDev',
  'BotOrNot',
  'Clickbait',
  'FakeNews',
  'JustPassingBy',
  'AFK_ButWatching',
  'ReportMePls',
  'BanEvader',
  'Newbie',
  'VeteranSinceBeta',
]

const clickerPhrases = [
  'кликов в секунду',
  'CPS',
  'тапов в минуту',
  'клик-пауэр',
  'клик-скорости',
  'автокликерного мастерства',
  'пальцевой мощи',
  'нажатийной силы',
]

const clickerItems = [
  'золотой курсор',
  'платиновый кликер',
  'алмазный тап',
  'мифический бустер',
  'легендарный перстень кликов',
  'эпические перчатки',
  'божественный автокликер',
]

const generateRandomComment = (id: number, depth = 0): ForumComment => {
  const commentVariants = [
    `Я достиг ${randomInt(10, 1000)} ${randomElement(
      clickerPhrases
    )} с ${randomElement(clickerItems)}!`,
    `Как вы думаете, ${randomElement(clickerItems)} стоит ${randomInt(
      100,
      10000
    )} кликов?`,
    `Новичок здесь, как увеличить ${randomElement(clickerPhrases)}?`,
    `Только что сломал ${randomInt(1, 5)} мышок за сессию…`,
    `Мой рекорд — ${randomInt(100, 1_000_000)} кликов без остановки!`,
    `Чит-код: ALT+F4 даёт +${randomInt(10, 100)}% к ${randomElement(
      clickerPhrases
    )}`,
    `Продаю аккаунт с ${randomInt(100, 1000)} уровнями, ${randomInt(
      1000,
      1_000_000
    )} кликов`,
    `БАН ЗА МАКРОСЫ! Я НЕ ВИНОВАТ!`,
    `Почему ${randomElement(users)} всегда в топе? Читер?`,
    `Обновление ${new Date().getFullYear() + 1} добавит ${randomElement([
      'новые курсы',
      'боссов',
      'клик-способности',
    ])}?`,
    `Моя бабушка кликает быстрее меня…`,
    `Совет: пейте ${randomElement([
      'Red Bull',
      'Monster',
      'воду',
      'чай',
    ])} для +${randomInt(5, 20)}% скорости кликов`,
    `Только что разблокировал ${randomElement(clickerItems)}!`,
    `Какой ваш рекорд CPS? Мой ${randomInt(5, 50)}!`,
    `Сломал палец, но кликаю носом…`,
  ]

  const comment: ForumComment = {
    id,
    author: randomElement(users),
    text: randomElement(commentVariants),
    date: now(),
    replies: [],
  }

  if (depth < 3 && Math.random() > 0.7) {
    const replyCount = randomInt(0, 5)
    for (let i = 0; i < replyCount; i++) {
      comment.replies.push(generateRandomComment(id * 100 + i + 1, depth + 1))
    }
  }

  return comment
}

const generateRandomTopic = (id: number): Topic => {
  const titles = [
    `Как я достиг ${randomInt(100, 10_000)} CPS за ${randomInt(1, 30)} дней`,
    `Обзор ${randomElement(clickerItems)}: стоит ли?`,
    `Сравнение ${randomElement(clickerItems)} и ${randomElement(clickerItems)}`,
    `Мой путь к ${randomInt(1000, 1_000_000)} кликам`,
    `Секретный метод увеличения ${randomElement(clickerPhrases)}`,
    `Почему ${randomElement(clickerItems)} — это развод?`,
    `Как я обманул систему и получил ${randomElement(clickerItems)} бесплатно`,
    `Новый чит для ${randomElement(['кликов', 'ресурсов', 'уровней'])}?`,
    `Баги и глюки после обновления ${randomInt(1, 10)}.${randomInt(
      0,
      9
    )}.${randomInt(0, 9)}`,
    `Модераторы забанили за ${randomElement([
      'макросы',
      'оскорбления',
      'читерство',
      'ничего',
    ])}`,
    `ТОП-${randomInt(5, 20)} лучших ${randomElement(clickerItems)}`,
    `Как ${randomElement(users)} достиг ${randomInt(
      100,
      1000
    )} уровня за ${randomInt(1, 7)} дней?`,
    `Мой кликер-бот на Python (исходники внутри)`,
    `Почему мой CPS упал на ${randomInt(10, 90)}% после апдейта?`,
    `Легендарный ${randomElement(clickerItems)} — миф или реальность?`,
  ]

  const topic: Topic = {
    id,
    title: randomElement(titles),
    author: randomElement(users),
    text: `Привет, сообщество! Хочу обсудить ${randomElement([
      'новую технику',
      'баг',
      'читерский метод',
      'легендарный предмет',
    ])}. ${randomElement([
      'Мой опыт показывает…',
      'Я обнаружил странное поведение…',
      'Хочу поделиться секретом…',
      'Помогите разобраться…',
    ])}`,
    date: now(),
    comments: [],
  }

  const commentCount = randomInt(0, 30)
  for (let i = 0; i < commentCount; i++) {
    topic.comments.push(generateRandomComment(i + 1))
  }
  return topic
}

const generateInitialData = (): StoredData => {
  const topics: Topic[] = []
  for (let i = 1; i <= 30; i++) topics.push(generateRandomTopic(i))

  const nextTopicId = topics.length + 1
  const nextCommentId =
    topics.flatMap(t => t.comments).reduce((m, c) => Math.max(m, c.id), 0) + 1

  return { topics, nextTopicId, nextCommentId }
}

const stored = loadFromLS()
const initial = stored ?? generateInitialData()
const { topics } = initial
let { nextTopicId, nextCommentId } = initial

if (!stored) saveToLS({ topics, nextTopicId, nextCommentId })

const commit = () => saveToLS({ topics, nextTopicId, nextCommentId })

export const getTopicById = (id?: number) =>
  topics.find(t => t.id === id) || null

export const addTopic = (
  title: string,
  text: string,
  author = 'Anonymous'
): Topic => {
  const topic: Topic = {
    id: nextTopicId++,
    title,
    author,
    text,
    date: now(),
    comments: [],
  }
  topics.push(topic)
  commit()
  return topic
}

export const addComment = (
  topicId: number,
  text: string,
  parentId?: number
): ForumComment | undefined => {
  const tIdx = topics.findIndex(t => t.id === topicId)
  if (tIdx === -1) return

  const comment: ForumComment = {
    id: nextCommentId++,
    author: 'Anonymous',
    text,
    date: now(),
    replies: [],
  }

  const deepAdd = (
    list: ForumComment[],
    pid: number,
    reply: ForumComment
  ): ForumComment[] =>
    list.map(c =>
      c.id === pid
        ? { ...c, replies: [...c.replies, reply] }
        : { ...c, replies: deepAdd(c.replies, pid, reply) }
    )

  topics[tIdx] = parentId
    ? {
        ...topics[tIdx],
        comments: deepAdd(topics[tIdx].comments, parentId, comment),
      }
    : { ...topics[tIdx], comments: [...topics[tIdx].comments, comment] }

  commit()
  return comment
}

export const deleteTopic = (id: number): boolean => {
  const pos = topics.findIndex(t => t.id === id)
  if (pos === -1) return false
  topics.splice(pos, 1)
  commit()
  return true
}

const deepDeleteComment = (list: ForumComment[], cid: number): ForumComment[] =>
  list
    .filter(c => c.id !== cid)
    .map(c => ({ ...c, replies: deepDeleteComment(c.replies, cid) }))

export const deleteComment = (topicId: number, commentId: number): boolean => {
  const idx = topics.findIndex(t => t.id === topicId)
  if (idx === -1) return false
  topics[idx] = {
    ...topics[idx],
    comments: deepDeleteComment(topics[idx].comments, commentId),
  }
  commit()
  return true
}

export { topics }
export type { ForumComment, Topic }
