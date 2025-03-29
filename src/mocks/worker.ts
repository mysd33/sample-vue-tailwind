import { handlers } from '@/mocks/handler'
import { setupWorker } from 'msw/browser'

// MSWのWorkerを初期化する
// https://mswjs.io/docs/integrations/browser#setup
export const worker = setupWorker(...handlers)
