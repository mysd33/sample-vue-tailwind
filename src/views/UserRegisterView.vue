<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import FormArea from '@/components/form/FormArea.vue'
import InputItem from '@/components/form/InputItem.vue'
import InputText from '@/components/form/InputText.vue'
import InputPassword from '@/components/form/InputPassword.vue'
import InputDate from '@/components/form/InputDate.vue'
import ToggleSwitch from '@/components/form/ToggleSwitch.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import LinkButton from '@/components/button/LinkButton.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'

import { useRouter } from 'vue-router'
import { computed, ref, type Ref } from 'vue'
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue'
import MessageBanner from '@/components/banner/MessageBanner.vue'

const router = useRouter()

const userId = ref('')
const password = ref('')
const userName = ref('')
const birthday = ref('')
const isAdmin = ref(false)

// TODO: バリデーションエラーの状態を管理するための変数を仮定義
const isUserIdError = ref(false)
const userIdErrorsMessage: Ref<string[], string[]> = ref([])
const isPasswordError = ref(false)
const passwordErrorsMessage: Ref<string[], string[]> = ref([])
const isUserNameError = ref(false)
const userNameErrorsMessage: Ref<string[], string[]> = ref([])
const isBirthdayError = ref(false)
const birthdayErrorsMessage: Ref<string[], string[]> = ref([])
const isValidationError = computed(() => {
  return isUserIdError.value || isPasswordError.value || isUserNameError.value
})

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref('')
const message = ref('')

const onBackButtonClick = () => {
  router.push({ name: 'userList' })
}
const onSubmit = (): void => {
  if (!isValid()) {
    return
  }
  // TODO: 仮でメニューへ遷移
  router.push({ name: 'userList' })
}

const isValid = (): boolean => {
  // TODO: 入力チェックの仮実装
  console.log('userid:' + userId.value)
  console.log('password:' + password.value)
  console.log('userName:' + userName.value)
  console.log('birthday:' + birthday.value)
  console.log('isAdmin:' + isAdmin.value)
  let isValid = true
  userIdErrorsMessage.value = []
  passwordErrorsMessage.value = []
  userNameErrorsMessage.value = []
  birthdayErrorsMessage.value = []

  if (userId.value === '') {
    isUserIdError.value = true
    userIdErrorsMessage.value.push('ユーザIDは必須入力です。')
    isValid = false
  } else {
    isUserIdError.value = false
  }
  if (password.value === '') {
    isPasswordError.value = true
    passwordErrorsMessage.value.push('パスワードは必須入力です。')
    isValid = false
  } else {
    isPasswordError.value = false
  }
  if (userName.value === '') {
    isUserNameError.value = true
    userNameErrorsMessage.value.push('ユーザ名は必須入力です。')
    isValid = false
  } else {
    isUserNameError.value = false
  }
  if (birthday.value === '') {
    isBirthdayError.value = true
    birthdayErrorsMessage.value.push('生年月日は必須入力です。')
    isValid = false
  } else {
    isBirthdayError.value = false
  }
  return isValid
}
</script>

<template>
  <HeaderArea title="ユーザ登録">
    <LinkButton :outline="true" @click="onBackButtonClick">ユーザ一覧に戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <FormArea @submit="onSubmit">
      <InputItem
        label="ユーザーID"
        labelFor="userId"
        :required="true"
        :errors="userIdErrorsMessage">
        <InputText
          id="userId"
          name="userId"
          :focus="true"
          v-model:value="userId"
          :is-error="isUserIdError" />
      </InputItem>
      <InputItem
        label="パスワード"
        labelFor="password"
        :required="true"
        :errors="passwordErrorsMessage">
        <InputPassword
          id="password"
          name="password"
          v-model:value="password"
          :is-error="isPasswordError" />
      </InputItem>
      <InputItem
        label="ユーザー名"
        labelFor="userName"
        :required="true"
        :errors="userNameErrorsMessage">
        <InputText
          id="userName"
          name="userName"
          v-model:value="userName"
          :is-error="isUserNameError" />
      </InputItem>
      <InputItem
        label="生年月日"
        labelFor="birthday"
        :required="true"
        :errors="birthdayErrorsMessage">
        <InputDate
          id="birthday"
          name="birthday"
          v-model:value="birthday"
          :is-error="isBirthdayError" />
      </InputItem>
      <InputItem>
        <ToggleSwitch v-model:enabled="isAdmin">管理者</ToggleSwitch>
      </InputItem>
      <InputItem></InputItem>
      <ButtonArea>
        <SubmitButton>ユーザ登録</SubmitButton>
      </ButtonArea>
    </FormArea>
  </MainContainer>
</template>
