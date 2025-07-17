<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref, useTemplateRef } from 'vue'

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
import { Form as VeeForm } from 'vee-validate'
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

// TODO: 暫定的にトグルのデータの保持
const isAdmin = ref(false)

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

const veeForm = useTemplateRef('vee-form')

// 初期表示処理
onMounted(async () => {
  console.log('id: ' + props.id)
  const user = await userService.findOne(props.id)
  // userがnull出なければ値をセット
  if (user) {
    const initialValues = {
      userId: user.id,
      userName: user.name,
      password: '',
      confirmPassword: '',
      birthday: formatDateWithHyphen(user.birthday),
    }
    // VeeValidateのフォームに初期値をセット
    veeForm.value?.setValues(initialValues)
    isAdmin.value = user.isAdmin
  }
})

// 更新ボタンクリック時の処理
// 入力チェックOKの場合の処理
const onValidUpdateSubmit = async (values) => {
  messageLevel.value = ''
  // ユーザ更新処理
  const user: User = {
    id: values.userId,
    password: values.password,
    confirmPassword: values.confirmPassword,
    name: values.userName,
    birthday: values.birthday,
    isAdmin: values.isAdmin,
  }
  await userService.update(user).then(() => {
    // 更新完了ダイアログを表示
    isUpdateCompleteDialogOpen.value = true
  })
}

const onInvalidUpdateSubmit = () => {
  messageLevel.value = 'validation'
}

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
  userService.delete(props.id).then(() => {
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

    <!-- TODO: form部分をFormArea画面部品の実装にする -->
    <VeeForm
      v-slot="{ handleSubmit, isSubmitting }"
      :validation-schema="schema"
      @invalid-submit="onInvalidUpdateSubmit"
      ref="vee-form">
      <form class="grid grid-cols-2 gap-6 text-left">
        <InputItem label="ユーザーID" labelFor="userId">
          <InputText id="userId" name="userId" :readonly="true" />
        </InputItem>
        <InputItem label="ユーザ名" labelFor="userName" :required="true">
          <InputText id="userName" name="userName" />
        </InputItem>
        <InputItem label="パスワード" labelFor="password" :required="true">
          <InputPassword id="password" name="password" :focus="true" />
        </InputItem>
        <InputItem label="パスワード" labelFor="confirmPassword" :required="true">
          <InputPassword id="confirmPassword" name="confirmPassword" :focus="true" />
        </InputItem>
        <InputItem label="生年月日" labelFor="birthday" :required="true">
          <InputDate id="birthday" name="birthday" />
        </InputItem>
        <InputItem>
          <ToggleSwitch v-model:enabled="isAdmin">管理者</ToggleSwitch>
        </InputItem>
        <ButtonArea>
          <SubmitButton :disabled="isSubmitting" @click="handleSubmit($event, onValidUpdateSubmit)"
            >ユーザ更新</SubmitButton
          >
          <SubmitButton :danger="true" :disabled="isSubmitting" @click="onClickDeleteButton"
            >ユーザ削除</SubmitButton
          >
        </ButtonArea>
      </form>
    </VeeForm>
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
