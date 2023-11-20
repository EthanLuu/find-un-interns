import { CacheKey } from '../constants/cache'

export const getToken = () => {
  if (!process.client) return
  return localStorage.getItem(CacheKey.TOKEN)
}

export const setToken = (token: string) => {
  if (!process.client) return
  return localStorage.setItem(CacheKey.TOKEN, token)
}

export const removeToken = () => {
  if (!process.client) return
  return localStorage.removeItem(CacheKey.TOKEN)
}
