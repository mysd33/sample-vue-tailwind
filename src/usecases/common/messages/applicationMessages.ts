import { MessageManager } from '@/framework/messages'

// メッセージ初期化処理
export const initMessages = () => {
  MessageManager.load(applicationMessages)
}

// メッセージIDの定義
export const MessageId = {
  E_EX_9001: 'e.ex.9001',
} as const

// メッセージの定義
const applicationMessages = {
  [MessageId.E_EX_9001]: 'システムエラーが発生しました。',
} as const
