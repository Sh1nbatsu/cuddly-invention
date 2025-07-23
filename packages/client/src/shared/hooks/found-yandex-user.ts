import { store } from '@/providers/store/store'
import { setUser } from '@/entities/user/model/user.slice'
import { User } from '@/shared/types/User'
import { YandexInfoResponse } from '@/shared/types/YandexInfoResponse'
import { useClient } from './useClient'

export async function foundYandexUser(): Promise<void> {
  useClient()
  let token: string | null = localStorage.getItem('ya_token')

  if (window.location.hash.startsWith('#')) {
    const hashParams = new URLSearchParams(window.location.hash.slice(1))
    const yandexAccessToken = hashParams.get('access_token')
    if (yandexAccessToken) {
      localStorage.setItem('ya_token', yandexAccessToken)
      history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      )
      token = yandexAccessToken
    }
  }

  if (!token) {
    return
  }

  try {
    const res = await fetch(
      `https://login.yandex.ru/info?format=json&oauth_token=${encodeURIComponent(
        token
      )}`
    )
    if (!res.ok) {
      throw new Error('Yandex OAuth request failed')
    }

    const yandexInfoResponse = (await res.json()) as YandexInfoResponse

    const user: Partial<User> = {
      id: Number(yandexInfoResponse.id),
      username:
        yandexInfoResponse.login ??
        yandexInfoResponse.default_email?.split('@')[0] ??
        '',
      email: yandexInfoResponse.default_email ?? '',
      first_name: yandexInfoResponse.first_name ?? '',
      second_name: yandexInfoResponse.last_name ?? '',
      avatar: yandexInfoResponse.default_avatar_id
        ? `https://avatars.yandex.net/get-yapic/${yandexInfoResponse.default_avatar_id}/islands-200`
        : null,
    }

    store.dispatch(setUser(user as User))
  } catch (err) {
    console.error(err)
    localStorage.removeItem('ya_token')
  }
}
