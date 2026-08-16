import axios from 'axios'

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export const api = axios.create({
  baseURL: apiBaseUrl,
})
