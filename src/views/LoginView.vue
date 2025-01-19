<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import LoginFormArea from '@/components/form/LoginFormArea.vue';
import LoginInputText from '@/components/form/LoginInputText.vue';
import LoginInputPassword from '@/components/form/LoginInputPassword.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import { useRouter } from 'vue-router';
import InputItem from '@/components/form/InputItem.vue';
import { computed, ref } from 'vue';
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue';


const router = useRouter();

const onSubmit = (): void => {
    // TODO: 入力チェックの実装

    // TODO: 仮でメニューへ遷移
    router.push({ name: 'menu' });
};

const isUserIdError = ref(false);
const isPasswordError = ref(false);
const errorMessages = ref([]);
// TODO: 仮で入力エラーメッセージ
//const isUserIdError = ref(true);
//const isPasswordError = ref(true);
//const errorMessages = ref(['ユーザIDは必須入力です。', 'パスワードは必須入力です。']);
const isValidationError = computed(() => isUserIdError.value || isPasswordError.value);

</script>

<template>
    <HeaderArea title="TODO管理アプリ" />
    <MainContainer>
        <LoginFormArea @submit="onSubmit">
            <ValidationErrorBanner :isError="isValidationError" />
            <InputItem :errors="errorMessages">
                <LoginInputText id="userId" name="userId" placeholder="ユーザID" :focus="true" :isError="isUserIdError" />
                <LoginInputPassword id="password" name="password" placeholder="パスワード" :isError="isPasswordError" />
            </InputItem>
            <SubmitButton size="lg" class="mt-3">ログイン</SubmitButton>
        </LoginFormArea>
    </MainContainer>
</template>