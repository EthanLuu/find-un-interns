import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.client) {
    return
  }
  const userStore = useUserStore()
  const token = getToken()
  if (!token) {
    return
  }
  await userStore.getUserInfo()
  // 如果已经登录，并准备进入 Login 页面，则重定向到主页
  if (to.path === '/login') {
    return navigateTo('/')
  }
})
