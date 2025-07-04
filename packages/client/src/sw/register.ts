export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    const swUrl = import.meta.env.DEV ? '/dev-sw.js?dev-sw' : '/sw.js'

    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        console.log('SW registered:', registration.scope)
      })
      .catch(error => {
        console.error('SW registration failed:', error)
      })
  }
}
