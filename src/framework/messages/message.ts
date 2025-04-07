/**
 * メッセージ管理クラス
 */
export class MessageManager {
  private readonly messages: { [key: string]: string }
  // シングルトンインスタンス
  private static instance: MessageManager | null = null

  /**
   * コンストラクタ
   * @param messages メッセージ定義
   */
  private constructor(messages: { [key: string]: string }) {
    this.messages = messages
  }

  /**
   * メッセージ定義を読み込む
   * @param messages メッセージ定義
   */
  public static load<T extends { [key: string]: string }>(messages: T): void {
    this.instance = new MessageManager(messages)
  }

  /**
   * メッセージを取得する
   * @param messageId メッセージID
   * @param args メッセージ内のプレースフォルダを置換する文字列
   */
  public static getMessage(messageId: string, args?: string[]): string {
    const messageTemplate = this.instance?.messages[messageId]
    if (!messageTemplate) {
      console.warn(`メッセージID[${String(messageId)}]のメッセージが見つかりません`)
      return `[${String(messageId)}, { ${args ?? ''} }]`
    }
    if (args && args.length > 0) {
      let message: string = messageTemplate
      args.forEach((arg, i) => {
        message = message.replace(`{${i}}`, arg)
      })
      return message
    }
    return messageTemplate
  }
}
