<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import FormArea from '@/components/form/FormArea.vue';
import InputItem from '@/components/form/InputItem.vue';
import InputText from '@/components/form/InputText.vue';
import InputPassword from '@/components/form/InputPassword.vue';
import InputDate from '@/components/form/InputDate.vue';
import ToggleSwitch from '@/components/form/ToggleSwitch.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';

import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue';

const router = useRouter();

// TODO: 仮のバインド
const isAdmin = ref(false);

// TODO: 仮の入力エラー
//const isUserIdError = ref(true);
//const userErrorsMessage = ref(['ユーザIDは必須入力です。']);
const isUserIdError = ref(false);
const userErrorsMessage = ref([]);
const isValidationError = computed(() => isUserIdError.value);


const onBackButtonClick = () => {
    router.push({ name: 'userList' });
};
const onSubmit = (): void => {
    // TODO: 仮でメニューへ遷移
    router.push({ name: 'userList' });
};

</script>

<template>
    <HeaderArea title="ユーザ登録">
        <LinkButton :outline="true" @click="onBackButtonClick">ユーザ一覧に戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <ValidationErrorBanner :isError="isValidationError" />
        <FormArea @submit="onSubmit">
            <InputItem label="ユーザーID" labelFor="userId" :required="true" :errors="userErrorsMessage">
                <InputText id="userId" name="userId" :focus="true" :isError="isUserIdError" />
            </InputItem>
            <InputItem label="パスワード" labelFor="password" :required="true">
                <InputPassword id="password" name="password" />
            </InputItem>
            <InputItem label="ユーザー名" labelFor="userName" :required="true">
                <InputText id="userName" name="userName" />
            </InputItem>
            <InputItem label="生年月日" labelFor="birthday" :required="true" :errors="['生年月日は必須入力です。']">
                <InputDate id="birthday" name="birthday" :isError="true" class="hoge" />
            </InputItem>
            <InputItem>
                <ToggleSwitch :enabled="isAdmin">管理者</ToggleSwitch>
            </InputItem>
            <InputItem></InputItem>
            <ButtonArea>
                <SubmitButton>ユーザ登録</SubmitButton>
            </ButtonArea>
        </FormArea>
    </MainContainer>
</template>
