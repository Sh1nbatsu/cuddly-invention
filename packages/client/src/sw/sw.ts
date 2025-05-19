/// <reference lib="webworker" />

const CACHE_NAME = 'my-pwa-v1'
const OFFLINE_PAGE = '/offline.html'

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis

sw.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(['/', OFFLINE_PAGE, '/assets/logo.svg']))
  )
})
