import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

/**
 * HTTPクライアント機能を提供するクラス
 * axiosをラップして、シングルトンでインスタンスを管理する
 */
export class HttpClient {
  private static instance: HttpClient | null = null
  private readonly axiosInstance: AxiosInstance

  private constructor() {
    this.axiosInstance = axios.create({
      //TODO: baseURLを環境変数から取得するようにする
      //baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    //  TODO: axios-retryの設定追加
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
}
