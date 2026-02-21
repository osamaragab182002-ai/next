export interface successlogin {
  message: string
  user: UserResponse
  token: string
}

export interface faildlogin {
  statusMsg: string
  message: string
}

export interface UserResponse {
  name: string
  email: string
  role: string
}
