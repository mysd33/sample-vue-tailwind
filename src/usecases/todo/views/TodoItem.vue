<script setup lang="ts">
import { useForm } from 'vee-validate'
import FormArea from '@/components/form/FormArea.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'
import type { Todo } from '@/usecases/todo/models/todo'
import type { TodoService } from '@/usecases/todo/services/todoService'

interface Props {
  todo: Todo
  service: TodoService
}
const props = defineProps<Props>()

interface Emits {
  (event: 'finish', todoId: string): void
  (event: 'delete', todoId: string): void
}

const emit = defineEmits<Emits>()

const { handleSubmit, isSubmitting } = useForm()

// 完了ボタン時の処理
const onClickFinishButton = handleSubmit(async () => {
  // TODOの完了処理
  await props.service.finish(props.todo.id!).then(() => {
    emit('finish', props.todo.id!)
  })
})

// 削除ボタン時の処理
const onClickDeleteButton = handleSubmit(async () => {
  // TODOの削除処理
  await props.service.delete(props.todo.id!).then(() => {
    emit('delete', props.todo.id!)
  })
})
</script>

<!-- ボタンごとにクライアント処理を分けるために@submitではなく各ボタンの@clickにイベントを関連付け -->
<template>
  <FormArea>
    <ButtonArea>
      <span class="pt-2" :class="{ 'line-through': todo.finished }">{{ todo.title }}</span>

      <SubmitButton v-if="!todo.finished" :disabled="isSubmitting" @click="onClickFinishButton"
        >完了</SubmitButton
      >
      <SubmitButton :disabled="isSubmitting" @click="onClickDeleteButton">削除</SubmitButton>
    </ButtonArea>
  </FormArea>
</template>
