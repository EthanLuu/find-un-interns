export const formatDataString = (rawDate?: string) => {
  if (!rawDate) return '-'
  const date = new Date(rawDate)
  return date.toLocaleDateString('zh-CN')
}
