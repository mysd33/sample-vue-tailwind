import axios from 'axios'
import { BusinessError, SystemError, OtherError } from '@/framework/errors'

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
        //TODO: メッセージ管理
        return new OtherError(
          'w.fw.9002',
          'サービス呼び出し時にエラーが発生しました。しばらく経ってから実行してください。',
        )
      }
    }
    //TODO: メッセージ管理
    return new SystemError('e.fw.9001', '想定外のエラーが発生しました')
  }
}
