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
import * as yup from 'yup'
import { useForm, validate } from 'vee-validate'

const router = useRouter()

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

// yup
const schema = yup.object({
  userId: yup.string().label('ユーザID').required().email(),
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

const onValidSubmit = () => {
  console.log(values)
  // TODO: 仮でメニューへ遷移
  router.push({ name: 'userList' })
}

const onInvalidSubmit = ({ errors }) => {
  // TODO: リファクタリング
  userIdErrorsMessage.value = errors.userId ? [errors.userId] : []
  isUserIdError.value = errors.userId ? true : false
  passwordErrorsMessage.value = errors.password ? [errors.password] : []
  isPasswordError.value = errors.password ? true : false
  userNameErrorsMessage.value = errors.userName ? [errors.userName] : []
  isUserNameError.value = errors.userName ? true : false
  birthdayErrorsMessage.value = errors.birthday ? [errors.birthday] : []
  isBirthdayError.value = errors.birthday ? true : false
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit)

const onBackButtonClick = () => {
  router.push({ name: 'userList' })
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
