<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ActionButton from '@/components/button/ActionButton.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import type { Todo } from '@/usecases/todo/models/Todo'

interface Props {
  todo: Todo
}
defineProps<Props>()

interface Emits {
  (event: 'finish', todoId: string): void
  (event: 'delete', todoId: string): void
}

const emits = defineEmits<Emits>()

const onClickFinishButton = (key?: string) => {
  emits('finish', key!)
}

const onClickDeleteButton = (key?: string) => {
  emits('delete', key!)
}
</script>

<!-- TODO: formに変えてVeeValidateのisSubmittingを使う -->
<template>
  <ButtonArea>
    <span class="pt-2" :class="{ 'line-through': todo.finished }">{{ todo.title }}</span>
    <ActionButton v-if="!todo.finished" :actionKey="todo.id" @click="onClickFinishButton"
      >完了</ActionButton
    >
    <ActionButton :actionKey="todo.id" @click="onClickDeleteButton">削除</ActionButton>
  </ButtonArea>
</template>
