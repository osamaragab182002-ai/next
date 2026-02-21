export interface BrandsResponse {
  results: number
  metadata: BrandsMetadata
  data: Daum[]
}

export interface BrandsMetadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface Daum {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
