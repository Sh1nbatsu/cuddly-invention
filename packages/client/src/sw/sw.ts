/// <reference lib="webworker" />

const CACHE_NAME = 'my-pwa-v1'
const OFFLINE_PAGE = '/offline.html'

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis
