<script setup lang="ts">
import SubmitButton from '@/components/button/SubmitButton.vue'
import InputItem from '@/components/form/InputItem.vue'
import LoginFormArea from '@/components/form/LoginFormArea.vue'
import LoginInputPassword from '@/components/form/LoginInputPassword.vue'
import LoginInputText from '@/components/form/LoginInputText.vue'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import { useForm, type GenericObject } from 'vee-validate'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

import MessageBanner, { type MessageLevel } from '@/components/banner/MessageBanner.vue'
import TableArea from '@/components/table/TableArea.vue'
import TableDataCol from '@/components/table/TableDataCol.vue'
import TableDataRow from '@/components/table/TableDataRow.vue'
import TableHeaderCol from '@/components/table/TableHeaderCol.vue'
import TableHeaderRow from '@/components/table/TableHeaderRow.vue'
import { AuthenticationService } from '@/usecases/login/services/authenticationService'

// ビジネスロジック
const authenticationService = AuthenticationService.getInstance()

const router = useRouter()

// TODO: サーバエラーの状態を管理するための変数を仮定義
const messageLevel = ref<MessageLevel>('')
const message = ref('')

// バリデーションエラーの状態を管理するための変数を定義
const isUserIdError = ref(false)
const isPasswordError = ref(false)
const validationErrorMessages: Ref<string[], string[]> = ref([])

// yup
const schema = yup.object({
  userId: yup.string().label('ユーザID').required().email(),
  password: yup.string().label('パスワード').required(),
})

// VeeValidate with yup
const { handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: schema,
})

const [userId] = defineField('userId')
const [password] = defineField('password')

// 入力チェック成功時
const onValidSubmit = async () => {
  validationErrorMessages.value = []
  message.value = ''
  messageLevel.value = ''

  // ログイン処理
  try {
    await authenticationService.login(userId.value, password.value)
    // ログイン成功時はメニュー画面に遷移
    router.push({ name: 'menu' })
    return
  } catch (e) {
    // TODO: 仮置きのエラーハンドリング。
    // AuthenticationError、BusinessErrorのみをハンドリングするように修正する
    // ログインエラーのメッセージを設定
    // warnレベルだが、ログインエラーは赤で表示させたいのでerrorで設定
    messageLevel.value = 'error'
    if (e instanceof Error) {
      message.value = e.message
      return
    } else {
      message.value = 'エラーが発生しました'
      return
    }
  }
}

// 入力エラー時
const onInvalidSubmit = ({ errors }: { errors: GenericObject }) => {
  // ログイン画面のみ、入力エラーメッセージをまとめて出力するため、ここでエラーメッセージを設定
  validationErrorMessages.value = [errors.userId, errors.password]
  messageLevel.value = 'validation'
  isUserIdError.value = errors.userId ? true : false
  isPasswordError.value = errors.password ? true : false
}

// handleSubmit時にバリデーション
const onSubmit = handleSubmit(onValidSubmit, onInvalidSubmit)
</script>

<template>
  <HeaderArea title="TODO管理アプリ" :show-user="false" />
  <MainContainer>
    <MessageBanner :message="message" :level="messageLevel" />
    <LoginFormArea @submit="onSubmit">
      <InputItem :errors="validationErrorMessages">
        <LoginInputText
          id="userId"
          name="userId"
          placeholder="ユーザID"
          :focus="true"
          v-model:value="userId" />
        <LoginInputPassword
          id="password"
          name="password"
          placeholder="パスワード"
          v-model:value="password" />
      </InputItem>
      <SubmitButton size="lg" class="mt-3" :disabled="isSubmitting">ログイン</SubmitButton>
    </LoginFormArea>
    <div class="mx-auto max-w-120">
      <p class="mt-5 mb-2">※テストユーザでログインできます</p>
      <TableArea>
        <template v-slot:thead>
          <TableHeaderRow>
            <TableHeaderCol>ユーザID</TableHeaderCol>
            <TableHeaderCol>ユーザ名</TableHeaderCol>
            <TableHeaderCol>パスワード</TableHeaderCol>
            <TableHeaderCol>管理者</TableHeaderCol>
          </TableHeaderRow>
        </template>
        <template v-slot:tbody>
          <TableDataRow>
            <TableDataCol>yamada@xxx.co.jp</TableDataCol>
            <TableDataCol>山田太郎</TableDataCol>
            <TableDataCol>password</TableDataCol>
            <TableDataCol>○</TableDataCol>
          </TableDataRow>
          <TableDataRow>
            <TableDataCol>tamura@xxx.co.jp</TableDataCol>
            <TableDataCol>田村一郎</TableDataCol>
            <TableDataCol>password</TableDataCol>
            <TableDataCol>-</TableDataCol>
          </TableDataRow>
        </template>
      </TableArea>
    </div>
  </MainContainer>
</template>
