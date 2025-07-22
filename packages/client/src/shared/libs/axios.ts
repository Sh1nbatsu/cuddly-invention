import axios from 'axios'

const isDev = import.meta.env.DEV || process.env.NODE_ENV === 'development'

export const BASE_URL = isDev
  ? 'http://localhost:3001/api'
  : 'https://titleisundefined.ya-praktikum.tech/api'

const BASE_AUTH_URL = isDev
  ? 'http://localhost:3001/auth'
  : 'https://titleisundefined.ya-praktikum.tech/auth'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

export const apiAuth = axios.create({
  baseURL: BASE_AUTH_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

apiAuth.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)
