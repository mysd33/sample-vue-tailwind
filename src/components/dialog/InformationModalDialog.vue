<script setup lang="ts">
import BaseModalDialog, { type BaseModalDialogProps } from './BaseModalDialog.vue'

type Props = BaseModalDialogProps
defineProps<Props>()

const isOpenModel = defineModel<boolean>('open')

const emit = defineEmits(['okButtonClick'])
const okButtonClicked = () => {
  isOpenModel.value = false
  emit('okButtonClick')
}
</script>

<template>
  <BaseModalDialog :title="title" :message="message" v-model:open="isOpenModel">
    <!-- TODO: ボタンのレイアウトの変更 -->
    <div class="mt-4">
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        @click="okButtonClicked">
        OK
      </button>
    </div>
  </BaseModalDialog>
</template>
