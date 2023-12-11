import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '../utils/auth'
import { useAxios } from '../composables/axios'

interface LoginParams {
  username: string
  password: string
}

interface RegisterParams {
  username: string
  password: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const axios = useAxios()
  const token = ref(getToken() || '')
  const username = ref('')
  const avatar = ref('')

  const login = async ({ username, password }: LoginParams) => {
    const { data } = await axios.value.post('/login', { username, password })
    const { token: userToken } = data
    if (!userToken) {
      return data
    }
    setToken(userToken)
    axios.value.defaults.headers.common['Authorization'] = userToken
    token.value = data.token
    return data
  }

  const logout = () => {
    removeToken()
    axios.value.defaults.headers.common['Authorization'] = ''
    username.value = ''
    avatar.value = ''
    token.value = ''
  }

  const register = async ({ username, password, email }: RegisterParams) => {
    const { data } = await axios.value.post('/register', { username, password, email })
    const { token: userToken } = data
    if (!token) {
      return data
    }
    setToken(userToken)
    axios.value.defaults.headers.common['Authorization'] = userToken
    token.value = data.token
    return data
  }

  const getUserInfo = async () => {
    try {
      axios.value.defaults.headers.common['Authorization'] = token.value
      const { data } = await axios.value.post(`/user/userinfo`)
      username.value = data.user.username
      avatar.value = data.user.avatar
    } catch (error) {
      logout()
    }
  }
  return { token, username, avatar, login, logout, register, getUserInfo }
})
