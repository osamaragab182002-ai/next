export interface Root {
  data: AllData
}

export interface AllData {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}