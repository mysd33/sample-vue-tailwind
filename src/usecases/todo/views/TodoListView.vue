<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
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

const router = useRouter()

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref('')
const message = ref('')
//const messageLevel = ref('warn');
//const message = ref('サービス呼び出し時にエラーが発生しました。しばらく経ってから実行してください。');

// yup
const schema = yup.object({
  todoTitle: yup.string().label('TODOタイトル').required(),
})

// VeeValidate with yup
const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
})

const [todoTitle] = defineField('todoTitle')

const isValidationError = computed(() => {
  return Object.keys(errors.value).length > 0
})

const onValidSubmit = () => {
  console.log('TODO作成:' + todoTitle.value)
  // TODO: 仮でバナー表示
  //messageLevel.value = 'info'
  //message.value = '作成しました。'
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit)

const onBackButtonClick = () => {
  router.push({ name: 'menu' })
}
</script>

<template>
  <HeaderArea title="TODOリスト">
    <LinkButton :outline="true" @click="onBackButtonClick">メニューに戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <form class="mb-3 flex flex-row gap-10" @submit.prevent="onSubmit">
      <InputItem class="basis-2/3 text-left">
        <InputText
          id="todoTitle"
          name="todoTitle"
          v-model:value="todoTitle"
          :error="errors.todoTitle" />
      </InputItem>
      <ButtonArea class="basis-1/3 text-left">
        <SubmitButton>作成</SubmitButton>
      </ButtonArea>
    </form>
    <hr />
    <div class="mt-3 text-left">
      <ul class="list-disc">
        <li class="ml-10">
          <ButtonArea>
            <span class="pt-2">牛乳を買う</span>
            <LinkButton>完了</LinkButton>
            <LinkButton>削除</LinkButton>
          </ButtonArea>
        </li>
      </ul>
    </div>
  </MainContainer>
</template>
