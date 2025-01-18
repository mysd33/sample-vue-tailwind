<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import LoginFormArea from '@/components/form/LoginFormArea.vue';
import LoginInputText from '@/components/form/LoginInputText.vue';
import LoginInputPassword from '@/components/form/LoginInputPassword.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import { useRouter } from 'vue-router';
import InputItem from '@/components/form/InputItem.vue';

const title = 'TODO管理アプリ';

const router = useRouter();

const onSubmit = (): void => {
    // TODO: 仮でメニューへ遷移
    router.push({ name: 'menu' });
};

</script>

<template>
    <HeaderArea :title="title" />
    <MainContainer>
        <LoginFormArea @submit="onSubmit">
            <InputItem label="ユーザID" labelFor="userId" :sr-only="true">
                <LoginInputText id="userId" name="userId" placeholder="ユーザID" :focus="true" />
            </InputItem>
            <InputItem label="パスワード" labelFor="password" :sr-only="true">
                <LoginInputPassword id="password" name="password" placeholder="パスワード" />
            </InputItem>
            <SubmitButton size="lg" class="mt-3">ログイン</SubmitButton>
        </LoginFormArea>
    </MainContainer>
</template>