import { ref, type Ref } from 'vue'
import type { CodableError } from '../errors'
import { defineStore } from 'pinia'

interface GlobalErrorStore {
  error: Ref<CodableError | null>
  setError: (error: CodableError) => void
  $reset: () => void
}

export const useGlobalErrorStore = defineStore<'globalError', GlobalErrorStore>(
  'globalError',
  () => {
    const error = ref<CodableError | null>(null)

    const setError = (newError: CodableError) => {
      error.value = newError
    }

    const $reset = () => {
      error.value = null
    }

    return { error, setError, $reset }
  },
)
