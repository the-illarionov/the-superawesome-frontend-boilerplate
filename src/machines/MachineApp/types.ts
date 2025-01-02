import type { ApiGetPostResponse } from '@/api/types'

export type MachineAppContext = {
  post?: ApiGetPostResponse
  error?: string
}
