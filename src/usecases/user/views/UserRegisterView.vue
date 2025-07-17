<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
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
import * as yup from 'yup'
import { Form as VeeForm } from 'vee-validate'
import InformationModalDialog from '@/components/dialog/InformationModalDialog.vue'
import type { User } from '@/usecases/common/models/user'
import { UserService } from '@/usecases/user/services/userService'
import { MessageManager } from '@/framework/messages'
import { MessageIds } from '@/usecases/common/messages/applicationMessages'

// ビジネスロジック
const userService = UserService.getInstance()

const router = useRouter()

// メッセージ
const messageLevel = ref<MessageLevel>('')
const message = ref('')

// ダイアログの状態を管理するための変数を定義
const isCreateCompleteDialogOpen = ref(false)

// yup
const schema = yup.object({
  userId: yup.string().label('ユーザID').required().email(),
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
const isAdmin = ref(false)
// ユーザ登録ボタンクリック時の処理
// 入力チェック成功時
const onValidSubmit = async (values) => {
  messageLevel.value = ''
  console.log(values)
  const user: User = {
    id: values.userId,
    password: values.password,
    confirmPassword: values.confirmPassword,
    name: values.userName,
    birthday: values.birthday,
    isAdmin: isAdmin.value,
  }
  await userService.create(user).then(() => {
    // 作成完了ダイアログを表示
    isCreateCompleteDialogOpen.value = true
  })
}

// 入力チェック失敗時
const onInvalidSubmit = () => {
  messageLevel.value = 'validation'
}

// 更新完了ダイアログのOKボタンクリック時の処理
const onClickCreateCompleteOKButtonClick = () => {
  router.push({ name: 'userList' })
}
</script>

<template>
  <HeaderArea title="ユーザ登録">
    <LinkButton :outline="true" forward-view-name="userList">ユーザ一覧に戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <MessageBanner :message="message" :level="messageLevel" />
    <!-- TODO: form部分をFormArea画面部品の実装にする -->
    <VeeForm
      v-slot="{ handleSubmit, isSubmitting }"
      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit">
      <form class="grid grid-cols-2 gap-6 text-left" @submit="handleSubmit($event, onValidSubmit)">
        <InputItem label="ユーザーID" labelFor="userId" :required="true">
          <InputText id="userId" name="userId" :focus="true" />
        </InputItem>
        <InputItem label="ユーザー名" labelFor="userName" :required="true">
          <InputText id="userName" name="userName" />
        </InputItem>
        <InputItem label="パスワード" labelFor="password" :required="true">
          <InputPassword id="password" name="password" />
        </InputItem>
        <InputItem label="確認用パスワード" labelFor="confirmPassword" :required="true">
          <InputPassword id="confirmPassword" name="confirmPassword" />
        </InputItem>
        <InputItem label="生年月日" labelFor="birthday" :required="true">
          <InputDate id="birthday" name="birthday" />
        </InputItem>
        <InputItem>
          <ToggleSwitch v-model:enabled="isAdmin">管理者</ToggleSwitch>
        </InputItem>
        <ButtonArea>
          <SubmitButton :disabled="isSubmitting">ユーザ登録</SubmitButton>
        </ButtonArea>
      </form>
    </VeeForm>
    <InformationModalDialog
      v-model:open="isCreateCompleteDialogOpen"
      title="ユーザ作成完了"
      message="ユーザを作成しました。"
      @ok-button-click="onClickCreateCompleteOKButtonClick" />
  </MainContainer>
</template>
