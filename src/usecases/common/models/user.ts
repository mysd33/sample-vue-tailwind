/**
 * ユーザ情報
 */
export interface User {
  /**
   * ユーザID
   */
  id: string
  /**
   * 名前
   */
  name: string
  /**
   * 誕生日
   */
  birthday: Date

  /**
   * 管理者フラグ
   */
  isAdmin: boolean

  //TODO: いずれ削除
  /**
   * パスワード
   */
  password: string
}
