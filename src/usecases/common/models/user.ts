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
   * 誕生日
   */
  birthday: Date

  /**
   * 管理者フラグ
   */
  isAdmin: boolean

  /**
   * パスワード
   */
  password: string
}
