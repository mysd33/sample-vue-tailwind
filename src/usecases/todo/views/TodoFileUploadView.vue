<script setup lang="ts">
import { ref } from 'vue'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import InputItem from '@/components/form/InputItem.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'
import InputFile from '@/components/form/InputFile.vue'
import RequiredBadge from '@/components/icons/RequiredBadge.vue'
import LinkButton from '@/components/button/LinkButton.vue'
import MessageBanner, { type MessageLevel } from '@/components/banner/MessageBanner.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

// メッセージ
const messageLevel = ref<MessageLevel>('')
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

const onValidSubmit = () => {
  console.log('TODO一括登録:' + todoFile.value)
  messageLevel.value = 'info'
  message.value = 'ファイルの一括登録を依頼しました。'
}

const onInvalidSubmit = () => {
  messageLevel.value = 'validation'
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit)
</script>

<template>
  <HeaderArea title="TODO一括登録">
    <LinkButton :outline="true" forward-view-name="menu">メニューに戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
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
