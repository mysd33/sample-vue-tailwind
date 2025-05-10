import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
} from 'axios'
import axiosRetry from 'axios-retry'
import {
  DefaultHttpClientErrorHandler,
  type HttpClientErrorHandler,
} from '@/framework/http-client/httpClientErrorHandler'

/**
 * HTTPクライアント機能を提供するクラス
 */
export class HttpClient {
  private readonly axiosInstance: AxiosInstance
  private readonly errorHandler: HttpClientErrorHandler

  public constructor(
    config: CreateAxiosDefaults,
    errorHandler: HttpClientErrorHandler = new DefaultHttpClientErrorHandler(),
    retryableStatusCodeList: string,
    retryCount: number = 3,
  ) {
    this.errorHandler = errorHandler
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true, // Cookieを送信する場合はtrueに設定
      ...config,
    })

    // リトライ対象のステータスコードを取得
    const retryableStatusCodes = retryableStatusCodeList?.split(',').map((code) => {
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
      retries: retryCount, // リトライ回数
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
