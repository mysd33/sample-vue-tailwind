<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import LoginFormArea from '@/components/form/LoginFormArea.vue'
import LoginInputText from '@/components/form/LoginInputText.vue'
import LoginInputPassword from '@/components/form/LoginInputPassword.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'
import { useRouter } from 'vue-router'
import InputItem from '@/components/form/InputItem.vue'
import { computed, ref, type Ref } from 'vue'
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { AuthenticationService } from '@/usecases/login/services/AuthenticationService'
import MessageBanner from '@/components/banner/MessageBanner.vue'
import { UserRepository } from '@/usecases/common/repositories/UserRepository'

const router = useRouter()
const userRepository = new UserRepository()
const authenticationService = new AuthenticationService(userRepository)

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref('')
const message = ref('')

// バリデーションエラーの状態を管理するための変数を定義
const isUserIdError = ref(false)
const isPasswordError = ref(false)
const validationErrorMessages: Ref<string[], string[]> = ref([])
const isValidationError = computed(() => {
  return Object.keys(errors.value).length > 0
})

// yup
const schema = yup.object({
  userId: yup.string().label('ユーザID').required().email(),
  password: yup.string().label('パスワード').required(),
})

// VeeValidate with yup
const { values, errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: schema,
})

const [userId] = defineField('userId')
const [password] = defineField('password')

const onValidSubmit = async () => {
  // TODO: エラーメッセージのクリアの方法を検討
  validationErrorMessages.value = []
  isUserIdError.value = false
  isPasswordError.value = false
  message.value = ''
  messageLevel.value = ''

  // ログイン処理
  const result = await authenticationService.login(userId.value, password.value)
  // TODO: 戻り値のあり方（仮置きでログイン結果booleanで返しているが、業務例外の検討）
  if (result) {
    // ログイン成功時はメニュー画面に遷移
    router.push({ name: 'menu' })
    return
  }
  // ログインエラーのメッセージを設定
  messageLevel.value = 'error'
  message.value = 'ユーザ名かパスワードが正しくありません'
}
const onInvalidSubmit = ({ errors }) => {
  // TODO: エラーメッセージのクリアの方法を検討
  isPasswordError.value = false
  message.value = ''
  messageLevel.value = ''
  // ログイン画面のみ入力エラーメッセージの出力方法が違うので、ここでエラーメッセージを設定
  validationErrorMessages.value = [errors.userId, errors.password]
  isUserIdError.value = errors.userId ? true : false
  isPasswordError.value = errors.password ? true : false
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit)
</script>

<template>
  <HeaderArea title="TODO管理アプリ" />
  <MainContainer>
    <ValidationErrorBanner :is-error="isValidationError" />
    <MessageBanner :message="message" :level="messageLevel" />
    <LoginFormArea @submit="onSubmit">
      <InputItem :errors="validationErrorMessages">
        <LoginInputText
          id="userId"
          name="userId"
          placeholder="ユーザID"
          :focus="true"
          :is-error="isUserIdError"
          v-model:value="userId" />
        <LoginInputPassword
          id="password"
          name="password"
          placeholder="パスワード"
          :is-error="isPasswordError"
          v-model:value="password" />
      </InputItem>
      <SubmitButton size="lg" class="mt-3" :disabled="isSubmitting">ログイン</SubmitButton>
    </LoginFormArea>
  </MainContainer>
</template>
