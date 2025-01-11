<script setup lang="ts">
import HeaderArea from '@/components/HeaderArea.vue';
import MainContainer from '@/components/MainContainer.vue';
import FormArea from '@/components/FormArea.vue';
import InputText from '@/components/InputText.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import { useRouter } from 'vue-router';
import InputPassword from '@/components/InputPassword.vue';

const title = 'TODO管理アプリ';

const router = useRouter();

const onSubmit = (): void => {
    // TODO: 仮でメニューへ遷移
    router.push({ name: 'menu' });
};

</script>

<template>
    <HeaderArea v-bind:title="title" />
    <MainContainer>
        <FormArea v-on:submit="onSubmit">
            <label for="userId" class="sr-only">ユーザーID</label>
            <InputText id="userId" name="userId" placeholder="ユーザID" class="z-0 focus:z-10 mb-[-1px] rounded-t-lg" />
            <label for="password" class="sr-only">パスワード</label>
            <InputPassword id="password" name="password" placeholder="パスワード" class="z-0 focus:z-10 rounded-b-lg" />
            <SubmitButton>ログイン</SubmitButton>
        </FormArea>
    </MainContainer>
</template>