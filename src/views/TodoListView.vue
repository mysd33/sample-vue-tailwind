<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import InputText from '@/components/form/InputText.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import { useRouter } from 'vue-router';
import InputItem from '@/components/form/InputItem.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue';
import { ref, type Ref } from 'vue';

const router = useRouter();

const todoTitle = ref('');

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
    console.log('TODO作成:' + todoTitle.value);
};

const isValid = (): boolean => {
    // TODO: 入力チェックの仮実装
    errorMessages.value = [];
    if (todoTitle.value === '') {
        isValidationError.value = true;
        errorMessages.value.push('TODOタイトルは必須入力です。');
        return false;
    }
    return true;
}

</script>

<template>
    <HeaderArea title="TODOリスト">
        <LinkButton :outline="true" @click="onBackButtonClick">メニューに戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <ValidationErrorBanner :is-error="isValidationError" />
        <form class="mb-3 flex flex-row gap-10" @submit.prevent="onSubmit">
            <InputItem class="basis-2/3 text-left" :errors="errorMessages">
                <InputText id="todoTitle" name="todoTitle" :is-error="isValidationError" v-model:value="todoTitle" />
            </InputItem>
            <ButtonArea class="basis-1/3 text-left">
                <SubmitButton>作成</SubmitButton>
            </ButtonArea>
        </form>
        <hr>
        <div class="mt-3 text-left">
            <ul class="list-disc">
                <li class="ml-10">
                    <ButtonArea>
                        <span class="pt-2">牛乳を買う</span>
                        <LinkButton>完了</LinkButton>
                        <LinkButton>削除</LinkButton>
                    </ButtonArea>
                </li>
            </ul>
        </div>
    </MainContainer>
</template>