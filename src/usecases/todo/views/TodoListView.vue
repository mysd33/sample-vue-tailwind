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
import { TodoRepository } from '@/usecases/todo/repositories/TodoRepository'
import { TodoService } from '@/usecases/todo/services/TodoService'
import type { Todo } from '@/usecases/todo/models/Todo'
import ActionButton from '@/components/button/ActionButton.vue'

const todoRepository = new TodoRepository()
const todoService = new TodoService(todoRepository)

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
  todoService
    .create(todoTitle.value)
    .then(() => {
      // TODO一覧を再取得
      todoService.findAll().then((result) => {
        todos.value = result
      })
      messageLevel.value = 'info'
      message.value = '作成しました。'
      todoTitle.value = ''
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

// 完了ボタン時の処理
const onClickFinishButton = (todoId?: string) => {
  // TODO: 二重送信防止のフラグを設定

  // TODOの完了処理
  todoService.finish(todoId!).then(() => {
    // TODO一覧を再取得
    todoService.findAll().then((result) => {
      todos.value = result
    })
    messageLevel.value = 'info'
    message.value = '完了しました。'
  })
}

// 削除ボタン時の処理
const onClickDeleteButton = (todoId?: string) => {
  // TODO: 二重送信防止のフラグを設定
  // TODOの削除処理
  todoService.delete(todoId!).then(() => {
    // TODO一覧を再取得
    todoService.findAll().then((result) => {
      todos.value = result
    })
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
    <!-- TODO: SimpleFormAreatというコンポーネント化  -->
    <form class="mb-3 flex flex-row gap-10" @submit.prevent="onSubmit">
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
          <ButtonArea>
            <span class="pt-2" :class="{ 'line-through': todo.finished }">{{ todo.title }}</span>
            <ActionButton v-if="!todo.finished" :actionKey="todo.id" @click="onClickFinishButton"
              >完了</ActionButton
            >
            <ActionButton :actionKey="todo.id" @click="onClickDeleteButton">削除</ActionButton>
          </ButtonArea>
        </li>
      </ul>
    </div>
  </MainContainer>
</template>
