import type {
  ApiArguments,
  ApiErrorFromBackend,
  ApiGetPostRequest,
  ApiGetPostResponse,
} from './types'

const isMock = false

export const Api = {
  getPost({ id }: ApiGetPostRequest): Promise<ApiGetPostResponse> {
    if (isMock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 1,
            userId: 1,
            title: 'Mock title',
            body: 'Mock body',
          })
        }, 1000)
      })
    }
    else {
      return api(`/posts/${id}`, {})
    }
  },
}

async function api(url: string, { method = 'GET', body, omitContentType = false }: ApiArguments) {
  const baseURL = 'https://jsonplaceholder.typicode.com'

  const headers: any = {
    // Authorization: `Bearer YOUR_TOKEN_HERE`,
  }

  if (!omitContentType) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(body)
  }

  const response = await fetch(`${baseURL}${url}`, {
    method,
    headers,
    // @ts-expect-error bodyinit
    body,
  })

  if (!response.ok) {
    let errorMessage
    if (response.status !== 404) {
      const errorResponseFromBackend: { message: ApiErrorFromBackend } = await response.json()
      errorMessage = errorResponseFromBackend.message

      throw new ErrorApiNotOk(errorMessage)
    }
    else {
      throw new ErrorApiNotOk('NOT_FOUND')
    }
  }

  const result = await response.json()
  return result
}

class ErrorApiNotOk extends Error {
  message: ApiErrorFromBackend

  constructor(message: ApiErrorFromBackend) {
    super()
    this.message = message
  }
}
