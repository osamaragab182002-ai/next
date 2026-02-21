export interface category {
  results: number
  metadata: categorydata
  data: data[]
}

export interface categorydata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface data {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
