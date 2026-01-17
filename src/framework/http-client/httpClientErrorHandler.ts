import { BusinessError, OtherError, SystemError } from '@/framework/errors'
import axios from 'axios'
import { FrameworkMessageIds, MessageManager } from '../messages'

/**
 * サーバエラーを処理するためのインターフェース
 */
export interface HttpClientErrorHandler {
  /**
   * サーバエラーを処理する
   * @param error - サーバエラー
   */
  handleError(error: unknown): Error
}

/**
 * HttpClientErrorHandlerのデフォルト実装
 */
export class DefaultHttpClientErrorHandler implements HttpClientErrorHandler {
  public handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const response = error.response
      if (response) {
        if (response.status >= 400 && response.status < 500) {
          return new BusinessError(response.data.code, response.data.message, response.data.details)
        }
        return new SystemError(response.data.code, response.data.message, response.data.details)
      } else {
        return new OtherError(
          FrameworkMessageIds.W_FW_9002,
          MessageManager.getMessage(FrameworkMessageIds.W_FW_9002),
        )
      }
    }
    return new SystemError(
      FrameworkMessageIds.E_FW_9001,
      MessageManager.getMessage(FrameworkMessageIds.E_FW_9001),
    )
  }
}
