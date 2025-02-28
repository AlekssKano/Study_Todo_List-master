export type BaseResponse<T = {}> = {
  data: T
  fieldErrors: {}[]
  messages: string[]
  resultCode: number
}