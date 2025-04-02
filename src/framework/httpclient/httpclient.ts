import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import { BusinessError, SystemError } from '../errors'
import { OtherError } from '../errors/errors'

/**
 * HTTPクライアント機能を提供するクラス
 * axiosをラップして、シングルトンでインスタンスを管理する
 */
export class HttpClient {
  private static instance: HttpClient | null = null
  private readonly axiosInstance: AxiosInstance

  private constructor() {
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
        return Promise.reject(this.handleError(error))
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
   * HttpClientのインスタンスを取得する
   * @returns HttpClientのインスタンス
   */
  public static getInstance(): HttpClient {
    if (HttpClient.instance === null) {
      HttpClient.instance = new HttpClient()
    }
    return HttpClient.instance
  }

  /**
   * Getリクエストを送信する
   * @type D レスポンスの型
   * @param url URLパス
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public get<D>(url: string, config?: AxiosRequestConfig<never>): Promise<AxiosResponse<D>> {
    return this.axiosInstance.get<D, AxiosResponse<D>, never>(url, config)
  }

  /**
   * Postリクエストを送信する
   * @type D リクエストの型
   * @type T レスポンスの型
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
   * @type D リクエストの型
   * @type T レスポンスの型
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
   * @type T レスポンスの型
   * @param url URLパス
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T, AxiosResponse<T>, never>(url)
  }

  // TODO: エラーハンドリングとバナーへのメッセージ表示処理の実現
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      // AxiosErrorの場合は、レスポンスのエラーメッセージを取得
      const response = error.response
      if (response) {
        // TODO: エラーレスポンスデータの形式(code, message, details)をチェック

        // TBD:401認証エラー
        // TBD:403権限エラー
        // それ以外の400系の場合は、サーバの入力エラーまたは業務エラー
        if (response.status >= 400 && response.status < 500) {
          return new BusinessError(response.data.code, response.data.message, response.data.details)
        }
        // 500系の場合は、システムエラー
        return new SystemError(response.data.code, response.data.message, response.data.details)
      } else {
        // ネットワークエラー
        return new OtherError(
          'w.fw.9002',
          'サービス呼び出し時にエラーが発生しました。しばらく経ってから実行してください。',
        )
      }
    }
    return new SystemError('e.fw.9001', '想定外のエラーが発生しました')
  }
}
