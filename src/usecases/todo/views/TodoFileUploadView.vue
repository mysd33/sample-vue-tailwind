<script setup lang="ts">
import { computed, ref } from 'vue'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import InputItem from '@/components/form/InputItem.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'
import InputFile from '@/components/form/InputFile.vue'
import RequiredBadge from '@/components/icons/RequiredBadge.vue'
import LinkButton from '@/components/button/LinkButton.vue'
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue'
import MessageBanner from '@/components/banner/MessageBanner.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref('')
const message = ref('')

// yup
const schema = yup.object({
  todoFile: yup.string().label('TODOファイル').required(),
})

// VeeValidate with yup
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: schema,
})

const [todoFile] = defineField('todoFile')

const isValidationError = computed(() => {
  return Object.keys(errors.value).length > 0
})

const onValidSubmit = () => {
  console.log('TODO一括登録:' + todoFile.value)
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit)
</script>

<template>
  <HeaderArea title="TODO一括登録">
    <LinkButton :outline="true" forward-view-name="menu">メニューに戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <form @submit.prevent="onSubmit" class="flex flex-col text-left">
      <InputItem>
        <label for="todoFile"
          >Todoファイル
          <RequiredBadge />
        </label>
        <InputFile
          id="todoFile"
          name="todoFile"
          :focus="true"
          v-model:value="todoFile"
          :error="errors.todoFile" />
      </InputItem>
      <ButtonArea class="mt-4">
        <SubmitButton :disabled="isSubmitting">登録</SubmitButton>
      </ButtonArea>
    </form>
  </MainContainer>
</template>
