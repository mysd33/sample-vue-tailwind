<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import FormArea from '@/components/form/FormArea.vue';
import InputItem from '@/components/form/InputItem.vue';
import InputText from '@/components/form/InputText.vue';
import InputPassword from '@/components/form/InputPassword.vue';
import InputDate from '@/components/form/InputDate.vue';
import ToggleSwitch from '@/components/form/ToggleSwitch.vue';
import RequiredBadge from '@/icons/RequiredBadge.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';

import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue';

interface Props {
    id: string;
}
defineProps<Props>();

const router = useRouter();

// TODO: 仮のバインド
const isAdmin = ref(true);

// TODO: 仮で入力エラーメッセージ
//const isPasswordError = ref(true);
//const passwordErrorMessage = ref(['パスワードは必須入力です。']);
const isPasswordError = ref(false);
const passwordErrorMessage = ref([]);
const isValidationError = computed(() => isPasswordError.value);

const onBackButtonClick = () => {
    router.push({ name: 'userList' });
};
const onSubmit = (): void => {
    // TODO: 仮でメニューへ遷移
    router.push({ name: 'userList' });
};

</script>

<template>
    <HeaderArea title="ユーザ詳細">
        <LinkButton :outline="true" @click="onBackButtonClick">ユーザ一覧に戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <ValidationErrorBanner :isError="isValidationError" />
        <FormArea @submit="onSubmit">
            <InputItem label="ユーザーID" labelFor="userId" :required="true">
                <!-- TODO: データバインド -->
                <InputText id="userId" name="userId" :readonly="true" value="yamada@xxx.co.jp" />
            </InputItem>
            <InputItem label="パスワード" labelFor="password" :required="true" :errors="passwordErrorMessage">
                <InputPassword id="password" name="password" :focus="true" :isError="isPasswordError" />
            </InputItem>
            <InputItem label="ユーザー名" labelFor="userName" :required="true">
                <!-- TODO: データバインド -->
                <InputText id="userName" name="userName" value="山田太郎" />
            </InputItem>
            <InputItem label="生年月日" labelFor="birthday" :required="true">
                <!-- TODO: データバインド -->
                <InputDate id="birthday" name="birthday" value="1990-01-01" />
            </InputItem>
            <InputItem>
                <!-- TODO: データバインド -->
                <ToggleSwitch :enabled="isAdmin">管理者</ToggleSwitch>
            </InputItem>
            <InputItem></InputItem>
            <ButtonArea>
                <SubmitButton>ユーザ更新</SubmitButton>
                <SubmitButton :danger="true">ユーザ削除</SubmitButton>
            </ButtonArea>
        </FormArea>
    </MainContainer>
</template>