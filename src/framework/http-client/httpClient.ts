import { CodableError } from '@/framework/errors'
import {
  DefaultHttpClientErrorHandler,
  type HttpClientErrorHandler,
} from '@/framework/http-client/httpClientErrorHandler'
import axios, {
  type AxiosInstance,
  type AxiosProgressEvent,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
} from 'axios'
import axiosRetry from 'axios-retry'
import type { ApiRequestConfig, ApiResponse, DownloadProgress, UploadProgress } from './api'
import {
  DEFAULT_RETRY_COUNT,
  HEADER_CONTENT_DISPOSITION,
  HEADER_CONTENT_TYPE,
  MIME_APPLICATION_JSON,
  MIME_APPLICATION_OCTET_STREAM,
  MIME_MULTIPART_FORM_DATA,
} from './constants'

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
    retryCount: number = DEFAULT_RETRY_COUNT,
  ) {
    this.errorHandler = errorHandler
    this.axiosInstance = axios.create({
      ...config,
      headers: {
        [HEADER_CONTENT_TYPE]: MIME_APPLICATION_JSON,
        ...config.headers,
      },
      // Cookieを送信する場合はtrueに設定する
      // withCredentials: true,
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
      async (error) => {
        // リトライ後のエラーの対応
        if (error instanceof CodableError) {
          // 前回試行時のエラーハンドリングでCodableErrorとして扱われている場合はそのまま返す
          return Promise.reject(error)
        }

        // ファイルダウンロード時のエラーレスポンスの処理
        // 正常終了時のデータ型をBlob型としているが、実際にはJSON形式のエラーメッセージが含まれているため個別の処理が必要
        if (
          error.response?.data instanceof Blob &&
          error.response?.headers?.[HEADER_CONTENT_TYPE]?.includes(MIME_APPLICATION_JSON)
        ) {
          try {
            // Blobをテキストとして読み取り、JSONパースして、エラーデータオブジェクトとして入れなおす
            const errorText = await new Response(error.response.data).text()
            try {
              error.response.data = JSON.parse(errorText)
            } catch (parseError) {
              console.error('Blob型データのテキストのJSONパースに失敗しました', parseError)
            }
          } catch (readError) {
            console.error('Blob型データのテキストの読み取りに失敗しました', readError)
          }
        }

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
   * @param params クエリパラメータ
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public async get<T>(
    url: string,
    params?: object,
    config?: ApiRequestConfig<null>,
  ): Promise<ApiResponse<T>> {
    const axiosResponse: AxiosResponse<T> = await this.axiosInstance.get(url, {
      params,
      ...config,
    })
    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
    }
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
  public async post<D, T>(
    url: string,
    data?: D,
    config?: ApiRequestConfig<D>,
  ): Promise<ApiResponse<T>> {
    const axiosResponse: AxiosResponse<T> = await this.axiosInstance.post(url, data, config)
    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
    }
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
  public async put<D, T>(
    url: string,
    data?: D,
    config?: ApiRequestConfig<D>,
  ): Promise<ApiResponse<T>> {
    const axiosResponse: AxiosResponse<T> = await this.axiosInstance.put(url, data, config)
    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
    }
  }

  /**
   * Deleteリクエストを送信する
   * @template D リクエストの型
   * @template T レスポンスの型
   * @param url URLパス
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public async delete<D, T>(
    url: string,
    data?: D,
    config?: ApiRequestConfig<D>,
  ): Promise<ApiResponse<T>> {
    const axiosResponse: AxiosResponse<T> = await this.axiosInstance.delete(url, {
      data,
      ...config,
    })
    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
    }
  }

  /**
   * 単一ファイルをアップロードする
   * @template T レスポンスの型
   * @param url URLパス
   * @param fileRecord ファイルデータ
   * @param additionalData 追加のフォームデータ
   * @param onProgress 進捗コールバック関数
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public async uploadFile<T>(
    url: string,
    fileRecord: Record<string, File>,
    additionalData?: Record<string, string>,
    onProgress?: (progressEvent: UploadProgress) => void,
    config?: ApiRequestConfig<FormData>,
  ): Promise<ApiResponse<T>> {
    return this.uploadFiles<T>(url, fileRecord, additionalData, onProgress, config)
  }

  /**
   * 複数ファイルをアップロードする
   * @template T レスポンスの型
   * @param url URLパス
   * @param fileRecords ファイルデータ配列
   * @param additionalData 追加のフォームデータ
   * @param onProgress 進捗コールバック関数
   * @param config リクエスト設定
   * @returns レスポンス
   */
  public async uploadFiles<T>(
    url: string,
    fileRecords: Record<string, File | File[]>,
    additionalData?: Record<string, string>,
    onProgress?: (progressEvent: UploadProgress) => void,
    config?: ApiRequestConfig<FormData>,
  ): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        [HEADER_CONTENT_TYPE]: MIME_MULTIPART_FORM_DATA,
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress) {
          const loaded = progressEvent.loaded ?? 0
          const total = progressEvent.total ?? 0
          const progress = total > 0 ? Math.round((loaded * 100) / total) : 0
          const uploadProgress: UploadProgress = {
            loaded,
            total,
            progress,
          }
          onProgress(uploadProgress)
        }
      },
      ...(config as AxiosRequestConfig<FormData>),
    }
    const formData = new FormData()
    Object.entries(fileRecords).forEach(([key, files]) => {
      if (Array.isArray(files)) {
        files.forEach((file) => {
          formData.append(key, file)
        })
      } else if (files !== undefined && files !== null) {
        formData.append(key, files)
      }
    })
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, formData, axiosConfig)
    return {
      data: response.data,
      status: response.status,
    }
  }

  /**
   * ファイルをダウンロードする
   * @param url URLパス
   * @param method HTTPメソッド(GET, POST)
   * @param data リクエストボディ(POSTの場合)
   * @param onProgress 進捗コールバック関数
   * @param config リクエスト設定
   * @returns ダウンロードしたファイルのBlobオブジェクト
   */
  public async downloadFile<D>(
    url: string,
    method: 'GET' | 'POST' = 'GET',
    data?: D,
    onProgress?: (progressEvent: DownloadProgress) => void,
    config?: ApiRequestConfig<D>,
  ): Promise<Blob> {
    const axiosConfig: AxiosRequestConfig = {
      responseType: 'blob',
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress) {
          const loaded = progressEvent.loaded ?? 0
          const total = progressEvent.total ?? 0
          const progress = total > 0 ? Math.round((loaded * 100) / total) : 0
          const downloadProgress: DownloadProgress = {
            loaded,
            total,
            progress,
          }
          onProgress(downloadProgress)
        }
      },
      ...config,
    }
    // リクエスト実行
    let response: AxiosResponse<Blob>
    if (method === 'GET') {
      response = await this.axiosInstance.get(url, axiosConfig)
    } else {
      response = await this.axiosInstance.post(url, data, axiosConfig)
    }
    const contentType = response.headers[HEADER_CONTENT_TYPE] ?? MIME_APPLICATION_OCTET_STREAM
    const contentDisposition = response.headers[HEADER_CONTENT_DISPOSITION]
    // ヘッダーよりファイル名の取得
    let fileName = 'download'
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename\*?="([^;"]+)"/i)
      if (fileNameMatch) {
        fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ''))
      }
    }
    const blob = new Blob([response.data], { type: contentType })

    // ファイルを自動的にダウンロード
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)

    return blob
  }
}
