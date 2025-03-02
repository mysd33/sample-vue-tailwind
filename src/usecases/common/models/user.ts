/**
 * ユーザ情報
 */
export interface User {
  /**
   * ユーザID
   */
  id: string
  /**
   * 姓
   */
  lastName: string
  /**
   * 名
   */
  firstName: string

  /**
   * パスワード
   */
  password: string

  // TODO: ユーザ認可情報の追加
}
