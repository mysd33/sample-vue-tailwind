<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import InputItem from '@/components/form/InputItem.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'
import InputFile from '@/components/form/InputFile.vue'
import RequiredBadge from '@/icons/RequiredBadge.vue'
import LinkButton from '@/components/button/LinkButton.vue'
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue'
import MessageBanner from '@/components/banner/MessageBanner.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const router = useRouter()

// TODO: バリデーションエラーの状態を管理するための変数を仮定義
const isValidationError = ref(false)
const validationErrorMessages: Ref<string[], string[]> = ref([])

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref('')
const message = ref('')

// yup
const schema = yup.object({
  todoFile: yup.string().label('TODOファイル').required(),
})

// VeeValidate with yup
const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
})

const [todoFile] = defineField('todoFile')

const onValidSubmit = () => {
  console.log('TODO一括登録:' + todoFile.value)
}

const onInvalidSubmit = ({ errors }) => {
  // TODO: リファクタリング
  validationErrorMessages.value = [errors.todoFile]
  isValidationError.value = errors.todoFile ? true : false
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit)

const onBackButtonClick = () => {
  router.push({ name: 'menu' })
}
</script>

<template>
  <HeaderArea title="TODO一括登録">
    <LinkButton :outline="true" @click="onBackButtonClick">メニューに戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <form @submit.prevent="onSubmit" class="flex flex-col text-left">
      <InputItem :errors="validationErrorMessages">
        <label for="todoFile"
          >Todoファイル
          <RequiredBadge />
        </label>
        <InputFile
          id="todoFile"
          name="todoFile"
          :focus="true"
          :is-error="isValidationError"
          v-model:value="todoFile" />
      </InputItem>
      <ButtonArea class="mt-4">
        <SubmitButton>登録</SubmitButton>
      </ButtonArea>
    </form>
  </MainContainer>
</template>
