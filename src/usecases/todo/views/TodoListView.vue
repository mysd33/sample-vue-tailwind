<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import InputText from '@/components/form/InputText.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'
import LinkButton from '@/components/button/LinkButton.vue'
import InputItem from '@/components/form/InputItem.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue'
import MessageBanner from '@/components/banner/MessageBanner.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

import type { Todo } from '@/usecases/todo/models/Todo'
import TodoItem from '@/usecases/todo/views/TodoItem.vue'
import { TodoServiceImpl } from '@/usecases/todo/services/TodoService'
import { TodoRepositoryImpl } from '@/usecases/todo/repositories/TodoRepository'

// ビジネスロジック
const todoService = new TodoServiceImpl(new TodoRepositoryImpl())

const todos = ref<Todo[]>([])

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref('')
const message = ref('')

// VeeValidate with yup
// yupによる入力チェック
const schema = yup.object({
  todoTitle: yup.string().label('TODOタイトル').required(),
})

// VeeValidate with yup
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: schema,
})

const [todoTitle] = defineField('todoTitle')

const isValidationError = computed(() => {
  return Object.keys(errors.value).length > 0
})
// 入力チェック成功時
const onValidSubmit = async () => {
  console.log('TODO作成:' + todoTitle.value)
  // TODOの作成処理
  await todoService
    .create(todoTitle.value)
    .then(() => {
      todoTitle.value = ''
      messageLevel.value = 'info'
      message.value = '作成しました。'
      // TODO一覧を再取得
      return todoService.findAll()
    })
    .then((result) => {
      todos.value = result
    })
    .catch(() => {
      //TODO: 業務エラーハンドリング、メッセージ取得
      messageLevel.value = 'warn'
      message.value =
        'サービス呼び出し時にエラーが発生しました。しばらく経ってから実行してください。'
    })
}
// 入力チェック失敗時
const onInvalidSubmit = () => {
  // TODO: 入力エラーと、業務エラーのメッセージ領域を統一すればこの処理が不要になる
  messageLevel.value = ''
  message.value = ''
}
// 作成ボタン（Submit）時の処理
const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit)

// 完了処理完了時
const onFinish = async (todoId: string) => {
  console.log('TODO完了:' + todoId)
  // TODO一覧を再取得
  await todoService.findAll().then((result) => {
    todos.value = result
    messageLevel.value = 'info'
    message.value = '完了しました。'
  })
}

// 削除処理完了時
const onDelete = async (todoId: string) => {
  console.log('TODO削除:' + todoId)
  // TODO一覧を再取得
  await todoService.findAll().then((result) => {
    todos.value = result
    messageLevel.value = 'info'
    message.value = '削除しました。'
  })
}

// 初期表示の処理
onMounted(async () => {
  // TODO一覧を取得
  todos.value = await todoService.findAll()
})
</script>

<template>
  <HeaderArea title="TODOリスト">
    <LinkButton :outline="true" forward-view-name="menu">メニューに戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <!-- TODO: SimpleFormAreaというコンポーネント化  -->
    <form class="mb-3 flex flex-row gap-10" @submit="onSubmit">
      <InputItem class="basis-2/3 text-left">
        <InputText
          id="todoTitle"
          name="todoTitle"
          v-model:value="todoTitle"
          :error="errors.todoTitle" />
      </InputItem>
      <ButtonArea class="basis-1/3 text-left">
        <SubmitButton :disabled="isSubmitting">作成</SubmitButton>
      </ButtonArea>
    </form>
    <hr />
    <div class="mt-3 text-left">
      <ul class="list-disc">
        <li v-for="todo in todos" :key="todo.id" class="ml-10">
          <TodoItem :todo="todo" :service="todoService" @finish="onFinish" @delete="onDelete" />
        </li>
      </ul>
    </div>
  </MainContainer>
</template>
