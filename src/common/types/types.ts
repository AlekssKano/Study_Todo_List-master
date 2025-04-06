export type BaseResponse<T = {}> = {
  data: T
  fieldErrors: {}[]
  messages: string[]
  resultCode: number
}
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

