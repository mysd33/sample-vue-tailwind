<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

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
import MessageBanner, { type MessageLevel } from '@/components/banner/MessageBanner.vue'
import ConfirmModalDialog from '@/components/dialog/ConfirmModalDialog.vue'
import InformationModalDialog from '@/components/dialog/InformationModalDialog.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { formatDateWithHyphen } from '@/usecases/common/utils/dateUtils'
import type { User } from '@/usecases/common/models/user'
import { UserService } from '@/usecases/user/services/userService'
import { MessageManager } from '@/framework/messages'
import { MessageIds } from '@/usecases/common/messages/applicationMessages'

interface Props {
  id: string
}

const props = defineProps<Props>()

// ビジネスロジック
const userService = UserService.getInstance()

const router = useRouter()

// メッセージ
const messageLevel = ref<MessageLevel>('')
const message = ref('')

// ダイアログの状態を管理するための変数を定義
const isUpdateCompleteDialogOpen = ref(false)
const isDeleteConfirmDialogOpen = ref(false)
const isDeleteCompleteDialogOpen = ref(false)

// yup
const schema = yup.object({
  userId: yup.string().label('ユーザID'),
  password: yup.string().label('パスワード').required(),
  confirmPassword: yup
    .string()
    .label('確認用パスワード')
    .required()
    .oneOf([yup.ref('password')], MessageManager.getMessage(MessageIds.W_EX_2001)),
  userName: yup.string().label('ユーザ名').required(),
  birthday: yup.date().label('生年月日').required(),
  isAdmin: yup.boolean().label('管理者'),
})

// VeeValidate with yup
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: schema,
})

const [userId] = defineField('userId')
const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')
const [userName] = defineField('userName')
const [birthday] = defineField('birthday')
const [isAdmin] = defineField('isAdmin')

// 初期表示処理
onMounted(async () => {
  console.log('id: ' + props.id)
  const user = await userService.findOne(props.id)
  // userがnull出なければ値をセット
  if (user) {
    userId.value = user.id
    userName.value = user.name
    birthday.value = formatDateWithHyphen(user.birthday)
    isAdmin.value = user.isAdmin
  }
})

// 更新ボタンクリック時の処理
// 入力チェックOKの場合の処理
const onValidUpdateSubmit = async () => {
  messageLevel.value = ''
  // ユーザ更新処理
  const user: User = {
    id: userId.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    name: userName.value,
    birthday: birthday.value,
    isAdmin: isAdmin.value,
  }
  await userService.update(user).then(() => {
    // 更新完了ダイアログを表示
    isUpdateCompleteDialogOpen.value = true
  })
}

const onInvalidUpdateSubmit = () => {
  messageLevel.value = 'validation'
}

const onClickUpdateButton = handleSubmit(onValidUpdateSubmit, onInvalidUpdateSubmit)

// 更新完了ダイアログのOKボタンクリック時の処理
const onClickUpdateCompleteOKButtonClick = () => {
  router.push({ name: 'userList' })
}

// 削除ボタンクリック時の処理
// 入力チェックしないため、handleSubmitは使用しない
const onClickDeleteButton = () => {
  isDeleteConfirmDialogOpen.value = true
}

// 削除確認ダイアログのOKボタンクリック時の処理
const onDeleteOKButtonClick = () => {
  // ユーザ削除処理
  userService.delete(userId.value).then(() => {
    // 処理完了ダイアログを表示
    isDeleteCompleteDialogOpen.value = true
  })
}

// 削除確認ダイアログのキャンセルボタンクリック時の処理
const onDeleteCancelButtonClick = () => {
  console.log('確認ダイアログのキャンセルボタンがクリックされました。')
}

// 削除完了ダイアログのOKボタンクリック時の処理
const onDeleteCompleteOKButtonClick = () => {
  router.push({ name: 'userList' })
}
</script>

<template>
  <HeaderArea title="ユーザ詳細">
    <LinkButton :outline="true" forward-view-name="userList">ユーザ一覧に戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <MessageBanner :message="message" :level="messageLevel" />
    <FormArea>
      <InputItem label="ユーザーID" labelFor="userId">
        <InputText id="userId" name="userId" :readonly="true" v-model:value="userId" />
      </InputItem>
      <InputItem label="ユーザ名" labelFor="userName" :required="true">
        <InputText
          id="userName"
          name="userName"
          v-model:value="userName"
          :error="errors.userName" />
      </InputItem>
      <InputItem label="パスワード" labelFor="password" :required="true">
        <InputPassword
          id="password"
          name="password"
          :focus="true"
          v-model:value="password"
          :error="errors.password" />
      </InputItem>
      <InputItem label="パスワード" labelFor="confirmPassword" :required="true">
        <InputPassword
          id="confirmPassword"
          name="confirmPassword"
          :focus="true"
          v-model:value="confirmPassword"
          :error="errors.confirmPassword" />
      </InputItem>
      <InputItem label="生年月日" labelFor="birthday" :required="true">
        <InputDate
          id="birthday"
          name="birthday"
          v-model:value="birthday"
          :error="errors.birthday" />
      </InputItem>
      <InputItem>
        <ToggleSwitch v-model:enabled="isAdmin">管理者</ToggleSwitch>
      </InputItem>
      <ButtonArea>
        <SubmitButton :disabled="isSubmitting" @click="onClickUpdateButton"
          >ユーザ更新</SubmitButton
        >
        <SubmitButton :danger="true" :disabled="isSubmitting" @click="onClickDeleteButton"
          >ユーザ削除</SubmitButton
        >
      </ButtonArea>
    </FormArea>
    <InformationModalDialog
      v-model:open="isUpdateCompleteDialogOpen"
      title="ユーザ情報更新完了"
      message="ユーザ情報を更新しました。"
      @ok-button-click="onClickUpdateCompleteOKButtonClick" />
    <ConfirmModalDialog
      v-model:open="isDeleteConfirmDialogOpen"
      title="ユーザ削除確認"
      message="ユーザを削除してもいいですか？"
      @ok-button-click="onDeleteOKButtonClick"
      @cancel-button-click="onDeleteCancelButtonClick" />
    <InformationModalDialog
      v-model:open="isDeleteCompleteDialogOpen"
      title="ユーザ削除完了"
      message="ユーザを削除しました。"
      @ok-button-click="onDeleteCompleteOKButtonClick" />
  </MainContainer>
</template>
