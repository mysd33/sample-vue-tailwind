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
      baseURL: import.meta.env.API_BASE_URL,
      timeout: import.meta.env.HTTP_CLIENT_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
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
   * @templatelatelate D レスポンスの型
   * @param url URLパス
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public get<D>(url: string, config?: AxiosRequestConfig<never>): Promise<AxiosResponse<D>> {
    return this.axiosInstance.get<D, AxiosResponse<D>, never>(url, config)
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
