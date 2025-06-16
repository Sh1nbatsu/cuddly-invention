export interface INotificationPayload {
  title: string
  body?: string
  icon?: string
  image?: string
  badge?: string
  tag?: string
  data?: unknown
  actions?: NotificationAction[]
  requireInteraction?: boolean
  silent?: boolean
  renotify?: boolean
  vibrate?: number | number[]
  timestamp?: number
  lang?: string
  dir?: 'auto' | 'ltr' | 'rtl'
}

class NotificationService {
  private readonly isSupported: boolean
  private permissionGranted: boolean | null = null

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'Notification' in window
  }

  public async init(): Promise<void> {
    try {
      if (!this.isSupported) return
      const permission = await Notification.requestPermission()
      this.permissionGranted = permission === 'granted'
    } catch (error) {
      console.error('Ошибка при запросе разрешения на уведомления:', error)
      this.permissionGranted = false
    }
  }

  public async send(payload: INotificationPayload): Promise<void> {
    try {
      if (!this.isSupported) return
      if (this.permissionGranted === null) {
        await this.init()
      }
      if (!this.permissionGranted) return

      const { title, ...options } = payload
      new Notification(title, options)
    } catch (error) {
      console.error('Ошибка при отправке уведомления:', error, payload)
    }
  }

  public async sendNotification(
    title: string,
    options?: Omit<INotificationPayload, 'title'>
  ): Promise<void> {
    try {
      await this.send({ title, ...options })
    } catch (error) {
      console.error('Ошибка в методе sendNotification:', error, title, options)
    }
  }

  public async sendSilent(
    payload: Omit<INotificationPayload, 'silent'>
  ): Promise<void> {
    try {
      await this.send({ ...payload, silent: true })
    } catch (error) {
      console.error('Ошибка при отправке тихого уведомления:', error, payload)
    }
  }
}

export const notificationService = new NotificationService()
