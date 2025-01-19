<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import LoginFormArea from '@/components/form/LoginFormArea.vue';
import LoginInputText from '@/components/form/LoginInputText.vue';
import LoginInputPassword from '@/components/form/LoginInputPassword.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import { useRouter } from 'vue-router';
import InputItem from '@/components/form/InputItem.vue';
import { computed, ref, type Ref } from 'vue';
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue';


const router = useRouter();

const userId = ref('');
const password = ref('');

// TODO: バリデーションエラーの状態を管理するための変数を仮定義
const isUserIdError = ref(false);
const isPasswordError = ref(false);
const errorMessages: Ref<string[], string[]> = ref([]);
const isValidationError = computed(() => isUserIdError.value || isPasswordError.value);

const isValid = (): boolean => {
    // TODO: 入力チェックの仮実装
    console.log("userid:" + userId.value);
    console.log("password" + password.value);
    let isValid = true;
    errorMessages.value = [];
    if (userId.value === '') {
        isUserIdError.value = true;
        errorMessages.value.push('ユーザIDは必須入力です。');
        isValid = false;
    } else {
        isUserIdError.value = false;
    }
    if (password.value === '') {
        isPasswordError.value = true;
        errorMessages.value.push('パスワードは必須入力です。');
        isValid = false;
    } else {
        isPasswordError.value = false;
    }
    return isValid;
};

const onSubmit = (): void => {
    if (!isValid()) {
        return;
    }
    // TODO: 仮でメニューへ遷移
    router.push({ name: 'menu' });
};
</script>

<template>
    <HeaderArea title="TODO管理アプリ" />
    <MainContainer>
        <LoginFormArea @submit="onSubmit">
            <ValidationErrorBanner :is-error="isValidationError" />
            <InputItem :errors="errorMessages">
                <LoginInputText id="userId" name="userId" placeholder="ユーザID" :focus="true" :is-error="isUserIdError"
                    v-model:value="userId" />
                <LoginInputPassword id="password" name="password" placeholder="パスワード" :is-error="isPasswordError"
                    v-model:value="password" />
            </InputItem>
            <SubmitButton size="lg" class="mt-3">ログイン</SubmitButton>
        </LoginFormArea>
    </MainContainer>
</template>