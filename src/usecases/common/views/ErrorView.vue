<script setup lang="ts">
import LinkButton from '@/components/button/LinkButton.vue'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import { onMounted, ref } from 'vue'
import { useGlobalErrorStore } from '@/usecases/common/stores/globalErrorStore'
import { SystemError } from '@/framework/errors'

import { MessageManager } from '@/framework/messages'
import { MessageIds } from '../messages/applicationMessages'

const globalErrorStore = useGlobalErrorStore()

// エラーコード
const errorCode = ref('')

// エラーメッセージ
const errorMessage = ref('')

onMounted(() => {
  // グローバルエラーのストアからエラーを取得
  const error = globalErrorStore.error
  if (error instanceof SystemError) {
    // システムエラーの場合
    errorCode.value = error.code
    errorMessage.value = error.message
    return
  }
  errorCode.value = MessageIds.E_EX_9001
  errorMessage.value = MessageManager.getMessage(MessageIds.E_EX_9001)
})
</script>

<template>
  <HeaderArea title="システムエラー"></HeaderArea>
  <MainContainer>
    <div>
      <h1 class="text-2xl">[{{ errorCode }}]{{ errorMessage }}</h1>
      <p>管理者にお問い合わせください。</p>
    </div>
    <LinkButton class="mt-3" forward-view-name="home">トップページへ戻る</LinkButton>
  </MainContainer>
</template>
