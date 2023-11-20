import axios from 'axios'

export const useAxios = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.BASE_URL as string
  axios.defaults.url = baseUrl
  return useState(() => axios.create({ baseURL: baseUrl }))
}
