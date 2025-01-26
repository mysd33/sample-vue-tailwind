<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref, type Ref } from 'vue'

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
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue'
import MessageBanner from '@/components/banner/MessageBanner.vue'
import ConfirmModalDialog from '@/components/dialog/ConfirmModalDialog.vue'
import InformationModalDialog from '@/components/dialog/InformationModalDialog.vue'
import * as yup from 'yup'
import { useForm, validate } from 'vee-validate'
import BaseButton from '@/components/button/BaseButton.vue'

interface Props {
  id: string
}
defineProps<Props>()

const router = useRouter()

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

// yup
const schema = yup.object({
  userId: yup.string().label('ユーザID'),
  password: yup.string().label('パスワード').required(),
  userName: yup.string().label('ユーザ名').required(),
  birthday: yup.date().label('生年月日').required(),
  isAdmin: yup.boolean().label('管理者'),
})

// VeeValidate with yup
const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
})

const [userId] = defineField('userId')
const [password] = defineField('password')
const [userName] = defineField('userName')
const [birthday] = defineField('birthday')
const [isAdmin] = defineField('isAdmin')

// TODO: 初期値設定
userId.value = 'yamada@xxx.co.jp'
userName.value = '山田太郎'
birthday.value = '1990-01-01'
isAdmin.value = true

const onValidSubmit = () => {
  console.log(values)
  // TODO: 仮でメニューへ遷移
  router.push({ name: 'userList' })
}

const onInvalidSubmit = ({ errors }) => {
  // TODO: リファクタリング
  passwordErrorsMessage.value = errors.password ? [errors.password] : []
  isPasswordError.value = errors.password ? true : false
  userNameErrorsMessage.value = errors.userName ? [errors.userName] : []
  isUserNameError.value = errors.userName ? true : false
  birthdayErrorsMessage.value = errors.birthday ? [errors.birthday] : []
  isBirthdayError.value = errors.birthday ? true : false
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit)

// 削除ボタンクリック時の処理の暫定定義
const onDeleteButtonClick = () => {
  // 削除ボタンのときは確認ダイアログを表示
  isConfirmDialogOpen.value = true
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

const onBackButtonClick = () => {
  router.push({ name: 'userList' })
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
        <!-- TODO クリック時の扱い -->
        <BaseButton name="delete" :danger="true" @click="onDeleteButtonClick"
          >ユーザ削除</BaseButton
        >
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
