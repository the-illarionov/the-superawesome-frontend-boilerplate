export type FormData = {
  username: string
  password: string
}

export type ValidationErrorType = 'empty' | 'too-short'

export type ValidationErrors = {
  username?: ValidationErrorType
  password?: ValidationErrorType
  server?: 'problem'
}
