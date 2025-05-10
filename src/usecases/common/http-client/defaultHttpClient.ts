import { HttpClient } from '@/framework/http-client'

let httpClient: HttpClient | null = null

/**
 * HttpClientのインスタンスを取得する
 * @returns HttpClientのインスタンス
 */
export function useHttpClient() {
  if (!httpClient) {
    httpClient = new HttpClient(
      {
        baseURL: import.meta.env.VITE_API_BASE_URL, // APIのベースURLを指定
        timeout: parseInt(import.meta.env.VITE_HTTP_CLIENT_TIMEOUT, 10) || 0, // タイムアウト時間(ms)を指定 デフォルト（0）は無制限
      },
      undefined,
      import.meta.env.VITE_RETRYABLE_STATUS_CODES, // リトライ対象のステータスコードのリスト
      import.meta.env.VITE_MAX_RETRY_COUNT, // リトライ回数の上限
    )
  }
  return httpClient
}
