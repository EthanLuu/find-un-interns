export interface JobInfo {
  _id: string
  title: string
  country: string
  city: string
  link: string
  orgnization: string
  start_date: string
  end_date: string
  apply_link: string
}

export interface JobDetailInfo {
  _id: string
  jobId: string
  raw: string
  summary: string
  tags: string[]
}
