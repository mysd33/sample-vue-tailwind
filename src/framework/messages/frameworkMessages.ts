export const FrameworkMessageIds = {
  W_FW_9002: 'w.fw.9002',
  E_FW_9001: 'e.fw.9001',
} as const

export const frameworkMessageList = {
  [FrameworkMessageIds.W_FW_9002]:
    'サービス呼び出し時にエラーが発生しました。しばらく経ってから実行してください。',
  [FrameworkMessageIds.E_FW_9001]: '想定外のエラーが発生しました。',
} as const
