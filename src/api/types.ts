export type ApiArguments = {
  method?: 'POST' | 'GET' | 'PUT'
  body?: object | string
  omitContentType?: boolean
}

export type ApiErrorFromBackend =
  | 'NOT_FOUND'
  | 'SOME_ERROR_FROM_BACKEND'

export type ApiGetPostRequest = {
  id: number
}

export type ApiGetPostResponse = {
  id: number
  userId: number
  title: string
  body: string
}
