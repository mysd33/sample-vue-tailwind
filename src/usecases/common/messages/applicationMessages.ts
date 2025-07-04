import { MessageManager } from '@/framework/messages'

// メッセージ初期化処理
export const initMessages = () => {
  MessageManager.load(applicationMessages)
}

// メッセージIDの定義
export const MessageIds = {
  W_EX_2001: 'w.ex.2001',
  E_EX_9001: 'e.ex.9001',
} as const

// メッセージの定義
const applicationMessages = {
  [MessageIds.W_EX_2001]: 'パスワードと確認用パスワードが一致しません。',
  [MessageIds.E_EX_9001]: 'システムエラーが発生しました。',
} as const
