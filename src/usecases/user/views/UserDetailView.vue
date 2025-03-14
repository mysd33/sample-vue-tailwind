<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'

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
import { useForm } from 'vee-validate'
import { UserRepository } from '@/usecases/common/repositories/UserRepository'
import { UserService } from '@/usecases/user/services/UserService'
import { formatDateWithHyphen } from '@/usecases/common/utils/date_utils'

interface Props {
  id: string
}
const props = defineProps<Props>()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

const router = useRouter()

// TODO: バナーの状態を管理するための変数を仮定義
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
const onClickUpdateButton = handleSubmit(() => {
  console.log(values)
  // TODO:更新処理の実装
  // TODO: 仮でメニューへ遷移
  router.push({ name: 'userList' })
})

// 削除ボタンクリック時の処理
const onClickDeleteButton = () => {
  isConfirmDialogOpen.value = true
}

const onConfirmDialogOKButtonClick = () => {
  console.log('確認ダイアログのOKボタンがクリックされました。')
  // TODO: 削除処理の実装

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
</script>

<template>
  <HeaderArea title="ユーザ詳細">
    <LinkButton :outline="true" forward-view-name="userList">ユーザ一覧に戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <FormArea>
      <InputItem label="ユーザーID" labelFor="userId">
        <InputText id="userId" name="userId" :readonly="true" v-model:value="userId" />
      </InputItem>
      <InputItem label="パスワード" labelFor="password" :required="true">
        <InputPassword
          id="password"
          name="password"
          :focus="true"
          v-model:value="password"
          :error="errors.password" />
      </InputItem>
      <InputItem label="ユーザ名" labelFor="userName" :required="true">
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
        <SubmitButton :disabled="isSubmitting" @click="onClickUpdateButton"
          >ユーザ更新</SubmitButton
        >
        <SubmitButton :danger="true" :disabled="isSubmitting" @click="onClickDeleteButton"
          >ユーザ削除</SubmitButton
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
