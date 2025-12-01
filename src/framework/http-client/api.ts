import type { AxiosRequestConfig } from 'axios'

// APIリクエスト設定の別名として定義
export type ApiRequestConfig<T> = AxiosRequestConfig<T>

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface ApiErrorResponse {
  conde: string
  message: string
  details?: string
}

export interface UploadProgress {
  loaded: number
  total: number
  progress: number
}

export interface DownloadProgress {
  loaded: number
  total: number
  progress: number
}

export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const candidate = value as Record<string, unknown>
  if (typeof candidate.code !== 'string' || typeof candidate.message !== 'string') {
    return false
  }
  if (
    candidate.details !== undefined &&
    (!Array.isArray(candidate.details) ||
      !candidate.details.every((item) => typeof item === 'string'))
  ) {
    return false
  }
  return true
}
