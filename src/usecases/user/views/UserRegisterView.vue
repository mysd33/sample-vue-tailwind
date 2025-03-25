<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
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
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import InformationModalDialog from '@/components/dialog/InformationModalDialog.vue'

import type { User } from '@/usecases/common/models/user'
import type { UserService } from '@/usecases/user/services/userService'

interface Props {
  userService: UserService
}

const props = defineProps<Props>()

const router = useRouter()

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref('')
const message = ref('')

// ダイアログの状態を管理するための変数を定義
const isCreateCompleteDialogOpen = ref(false)

// yup
const schema = yup.object({
  userId: yup.string().label('ユーザID').required().email(),
  password: yup.string().label('パスワード').required(),
  userName: yup.string().label('ユーザ名').required(),
  birthday: yup.date().label('生年月日').required(),
  isAdmin: yup.boolean().label('管理者'),
})

// VeeValidate with yup
const { values, errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: schema,
})

const [userId] = defineField('userId')
const [password] = defineField('password')
const [userName] = defineField('userName')
const [birthday] = defineField('birthday')
const [isAdmin] = defineField('isAdmin')

const isValidationError = computed(() => {
  return Object.keys(errors.value).length > 0
})

// ユーザ登録ボタンクリック時の処理
// バリデーションOK時の処理
const onValidSubmit = async () => {
  console.log(values)
  const user: User = {
    id: values.userId,
    password: values.password,
    name: values.userName,
    birthday: values.birthday,
    isAdmin: values.isAdmin,
  }
  await props.userService.create(user).then(() => {
    // 作成完了ダイアログを表示
    isCreateCompleteDialogOpen.value = true
  })
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit)

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
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <FormArea @submit="onSubmit">
      <InputItem label="ユーザーID" labelFor="userId" :required="true">
        <InputText
          id="userId"
          name="userId"
          :focus="true"
          v-model:value="userId"
          :error="errors.userId" />
      </InputItem>
      <InputItem label="パスワード" labelFor="password" :required="true">
        <InputPassword
          id="password"
          name="password"
          v-model:value="password"
          :error="errors.password" />
      </InputItem>
      <InputItem label="ユーザー名" labelFor="userName" :required="true">
        <InputText
          id="userName"
          name="userName"
          v-model:value="userName"
          :error="errors.userName" />
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
      <InputItem></InputItem>
      <ButtonArea>
        <SubmitButton :disabled="isSubmitting">ユーザ登録</SubmitButton>
      </ButtonArea>
    </FormArea>
    <InformationModalDialog
      v-model:open="isCreateCompleteDialogOpen"
      title="ユーザ作成完了"
      message="ユーザを作成しました。"
      @ok-button-click="onClickCreateCompleteOKButtonClick" />
  </MainContainer>
</template>
