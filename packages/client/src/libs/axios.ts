import axios from 'axios'

const BASE_URL = 'https://ya-praktikum.tech/api/v2'

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

api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)
