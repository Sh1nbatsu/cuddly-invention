import { useEffect, useCallback } from 'react'
import {
  notificationService,
  INotificationPayload,
} from '@/notification/notification-service'

export function useWebNotify() {
  useEffect(() => {
    void notificationService.init()
  }, [])

  const sendNotification = useCallback(
    async (title: string, options?: Omit<INotificationPayload, 'title'>) => {
      await notificationService.sendNotification(title, options)
    },
    []
  )

  const sendSilent = useCallback(
    async (payload: Omit<INotificationPayload, 'silent'>) => {
      await notificationService.sendSilent(payload)
    },
    []
  )

  return { sendNotification, sendSilent }
}
