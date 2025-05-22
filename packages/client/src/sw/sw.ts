/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

const CACHE_NAME = 'my-custom-cache-v1'
const STATIC_ASSETS = ['/', '/index.html']

const swSelf = self as unknown as ServiceWorkerGlobalScope

const wbManifest = (self as any).__WB_MANIFEST || []
const assetsToCache = wbManifest.map((entry: any) => entry.url)

swSelf.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker installing...')
  swSelf.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      const urlsToCache = [...STATIC_ASSETS, ...assetsToCache]
      for (const url of urlsToCache) {
        try {
          const response = await fetch(url)
          if (response.ok) await cache.put(url, response.clone())
        } catch (err) {
          console.warn('Failed to cache:', url, err)
        }
      }
    })
  )
})

swSelf.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response
      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})

swSelf.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache)
        })
      )
    )
  )
  event.waitUntil(swSelf.clients.claim())
})

export {}
