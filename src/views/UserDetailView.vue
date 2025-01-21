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
import ConfirmModalDialog from '@/components/dialog/ConfirmModalDialog.vue'
import InformationModalDialog from '@/components/dialog/InformationModalDialog.vue'

interface Props {
  id: string
}
defineProps<Props>()

const router = useRouter()

// TODO: 初期値設定
const userId = ref('yamada@xxx.co.jp')
const password = ref('')
const userName = ref('山田太郎')
const birthday = ref('1990-01-01')
const isAdmin = ref(true)

// TODO: バリデーションエラーの状態を管理するための変数を仮定義
const isPasswordError = ref(false)
const passwordErrorsMessage: Ref<string[], string[]> = ref([])
const isUserNameError = ref(false)
const userNameErrorsMessage: Ref<string[], string[]> = ref([])
const isBirthdayError = ref(false)
const birthdayErrorsMessage: Ref<string[], string[]> = ref([])
const isValidationError = computed(() => {
  return isPasswordError.value || isUserNameError.value || isBirthdayError.value
})

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref('')
const message = ref('')

// TODO: ダイアログの状態を管理するための変数を仮定義
const isConfirmDialogOpen = ref(false)
const isInformationDialogOpen = ref(false)

const onBackButtonClick = () => {
  router.push({ name: 'userList' })
}
const onSubmit = (event: SubmitEvent): void => {
  const button = event.submitter as HTMLButtonElement
  if (button.name === 'update') {
    // 更新ボタンのときは入力チェック
    if (!isValid()) {
      return
    }
    // TODO: 仮でメニューへ遷移
    router.push({ name: 'userList' })
  } else {
    // 削除ボタンのときは確認ダイアログを表示
    isConfirmDialogOpen.value = true
  }
}

const onConfirmDialogOKButtonClick = () => {
  console.log('確認ダイアログのOKボタンがクリックされました。')
  // 処理完了ダイアログを表示
  isInformationDialogOpen.value = true
}

const onConfirmDialogCancelButtonClick = () => {
  console.log('確認ダイアログのキャンセルボタンがクリックされました。')
}

const onInfoDialogOKButtonClick = () => {
  console.log('完了ダイアログのOKボタンがクリックされました。')
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
  passwordErrorsMessage.value = []
  userNameErrorsMessage.value = []
  birthdayErrorsMessage.value = []

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
  <HeaderArea title="ユーザ詳細">
    <LinkButton :outline="true" @click="onBackButtonClick">ユーザ一覧に戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <FormArea @submit="onSubmit">
      <InputItem label="ユーザーID" labelFor="userId">
        <InputText id="userId" name="userId" :readonly="true" v-model:value="userId" />
      </InputItem>
      <InputItem
        label="パスワード"
        labelFor="password"
        :required="true"
        :errors="passwordErrorsMessage">
        <InputPassword
          id="password"
          name="password"
          :focus="true"
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
        <SubmitButton name="update">ユーザ更新</SubmitButton>
        <SubmitButton name="delete" :danger="true">ユーザ削除</SubmitButton>
      </ButtonArea>
    </FormArea>
    <ConfirmModalDialog
      v-model:open="isConfirmDialogOpen"
      title="ユーザ削除確認"
      message="ユーザを削除してもいいですか？"
      @ok-button-click="onConfirmDialogOKButtonClick"
      @cancel-button-click="onConfirmDialogCancelButtonClick" />
    <InformationModalDialog
      v-model:open="isInformationDialogOpen"
      title="ユーザ削除完了"
      message="ユーザを削除しました。"
      @ok-button-click="onInfoDialogOKButtonClick" />
  </MainContainer>
</template>
