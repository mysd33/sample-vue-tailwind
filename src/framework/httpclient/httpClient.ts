import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import {
  DefaultHttpClientErrorHandler,
  type HttpClientErrorHandler,
} from '@/framework/httpclient/httpClientErrorHandler'

/**
 * HTTPクライアント機能を提供するクラス
 */
export class HttpClient {
  private readonly axiosInstance: AxiosInstance
  private readonly errorHandler: HttpClientErrorHandler

  public constructor(errorHandler: HttpClientErrorHandler = new DefaultHttpClientErrorHandler()) {
    this.errorHandler = errorHandler
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.API_BASE_URL, // APIのベースURLを指定
      timeout: parseInt(import.meta.env.HTTP_CLIENT_TIMEOUT, 10) || 0, // タイムアウト時間(ms)を指定 デフォルト（0）は無制限
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true, // Cookieを送信する場合はtrueに設定
    })

    // リトライ対象のステータスコードを取得
    const retryableStatusCodeStr = import.meta.env.RETRY_STATUS_CODES as string
    const retryableStatusCodes = retryableStatusCodeStr?.split(',').map((code) => {
      return Number(code.trim())
    })

    // レスポンスインターセプターを追加して、エラーハンドリングを行う
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // 成功時はそのままレスポンスを返す
        return response
      },
      (error) => {
        return Promise.reject(this.errorHandler.handleError(error))
      },
    )

    // axios-retryの設定追加
    axiosRetry(this.axiosInstance, {
      retries: import.meta.env.RETRY_COUNT ?? 3, // リトライ回数
      retryDelay: axiosRetry.exponentialDelay, // エクスポネンシャルバックオフを使用
      retryCondition: (error) => {
        return (
          // ネットワークエラーまたは冪等性のあるリクエストが5xxエラーの場合にリトライ
          axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          // 指定したステータスコードであればリトライ
          (retryableStatusCodes
            ? retryableStatusCodes.includes(error.response?.status ?? 0)
            : false)
        )
      },
      onRetry: (retryCount, error, requestConfig) => {
        // リトライ時は警告ログを出力
        console.warn(
          `[${requestConfig.method?.toUpperCase()} ${requestConfig.url}] リトライ処理: ${retryCount}回`,
        )
      },
    })
  }

  /**
   * Getリクエストを送信する
   * @templatelatelate T レスポンスの型
   * @param url URLパス
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public get<T>(url: string, config?: AxiosRequestConfig<null>): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T, AxiosResponse<T>, null>(url, config)
  }

  /**
   * Postリクエストを送信する
   * @template D リクエストの型
   * @template T レスポンスの型
   * @param url URLパス
   * @param data リクエストボディ
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public post<D, T>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config)
  }

  /**
   * Putリクエストを送信する
   * @template D リクエストの型
   * @template T レスポンスの型
   * @param url URLパス
   * @param data リクエストボディ
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public put<D, T>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config)
  }

  /**
   * Deleteリクエストを送信する
   * @template T レスポンスの型
   * @param url URLパス
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T, AxiosResponse<T>, never>(url)
  }
}
