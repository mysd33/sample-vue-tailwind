<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import InputItem from '@/components/form/InputItem.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import InputFile from '@/components/form/InputFile.vue';
import RequiredBadge from '@/icons/RequiredBadge.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import { useRouter } from 'vue-router';
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue';
import { ref, type Ref } from 'vue';

const router = useRouter();
const todoFile: Ref<File, File> = ref(new File([], ''));

// TODO: バリデーションエラーの状態を管理するための変数を仮定義
const isValidationError = ref(false);
const errorMessages: Ref<string[], string[]> = ref([]);

const onBackButtonClick = () => {
    router.push({ name: 'menu' });
};

const onSubmit = () => {
    if (!isValid()) {
        return;
    }
    console.log('TODOファイルアップロード:' + todoFile.value);
};

const isValid = (): boolean => {
    // TODO: 入力チェックの仮実装
    if (todoFile.value.name === '') {
        isValidationError.value = true;
        errorMessages.value.push('TODOファイルは必須入力です。');
        return false;
    }
    return true;
}


</script>

<template>
    <HeaderArea title="TODO一括登録">
        <LinkButton :outline="true" @click="onBackButtonClick">メニューに戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <ValidationErrorBanner :is-error="isValidationError" />
        <form @submit.prevent="onSubmit" class="flex flex-col text-left">
            <InputItem :errors="errorMessages">
                <label for="todoFile">Todoファイル
                    <RequiredBadge />
                </label>
                <InputFile id="todoFile" name="todoFile" :focus="true" :is-error="isValidationError"
                    v-model:value="todoFile" />
            </InputItem>
            <ButtonArea class="mt-4">
                <SubmitButton>登録</SubmitButton>
            </ButtonArea>
        </form>
    </MainContainer>
</template>