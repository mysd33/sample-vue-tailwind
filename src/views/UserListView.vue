<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import TableArea from '@/components/table/TableArea.vue';
import TableHeaderRow from '@/components/table/TableHeaderRow.vue';
import TableHeaderCol from '@/components/table/TableHeaderCol.vue';
import TableDataRow from '@/components/table/TableDataRow.vue';
import PaginationLink from '@/components/pagination/PaginationLink.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';
import TableDataCol from '@/components/table/TableDataCol.vue';
import { useRouter } from 'vue-router';

const title = 'ユーザ管理';
const router = useRouter();

const onBackButtonClick = () => {
    router.push('menu');
};
const onNewUserButonClicked = () => {
    router.push({ name: 'newUser' });
}

</script>

<template>
    <HeaderArea v-bind:title="title">
        <LinkButton v-bind:outline="true" v-on:click="onBackButtonClick">メニューに戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <!-- TODO: テーブルの部品化検討中 -->
        <TableArea>
            <template v-slot:thead>
                <TableHeaderRow>
                    <TableHeaderCol>No</TableHeaderCol>
                    <TableHeaderCol>ユーザID</TableHeaderCol>
                    <TableHeaderCol>ユーザ名</TableHeaderCol>
                    <TableHeaderCol>誕生日</TableHeaderCol>
                    <TableHeaderCol>年齢</TableHeaderCol>
                    <TableHeaderCol>管理者</TableHeaderCol>
                    <TableHeaderCol></TableHeaderCol>
                </TableHeaderRow>
            </template>
            <template v-slot:tbody>
                <TableDataRow>
                    <TableDataCol>1</TableDataCol>
                    <TableDataCol>yamada@xxx.co.jp</TableDataCol>
                    <TableDataCol>山田太郎</TableDataCol>
                    <TableDataCol>1990/01/01</TableDataCol>
                    <TableDataCol>35</TableDataCol>
                    <TableDataCol>○</TableDataCol>
                    <TableDataCol>
                        <LinkButton>詳細</LinkButton>
                    </TableDataCol>
                </TableDataRow>
                <TableDataRow>
                    <TableDataCol>2</TableDataCol>
                    <TableDataCol>tamura@xxx.co.jp</TableDataCol>
                    <TableDataCol>田村</TableDataCol>
                    <TableDataCol>1986/11/05</TableDataCol>
                    <TableDataCol>38</TableDataCol>
                    <TableDataCol>-</TableDataCol>
                    <TableDataCol>
                        <LinkButton>詳細</LinkButton>
                    </TableDataCol>
                </TableDataRow>
                <TableDataRow>
                    <TableDataCol>3</TableDataCol>
                    <TableDataCol>tamura2@xxx.co.jp</TableDataCol>
                    <TableDataCol>田村2</TableDataCol>
                    <TableDataCol>1986/11/05</TableDataCol>
                    <TableDataCol>38</TableDataCol>
                    <TableDataCol>-</TableDataCol>
                    <TableDataCol>
                        <LinkButton>詳細</LinkButton>
                    </TableDataCol>
                </TableDataRow>
                <TableDataRow>
                    <TableDataCol>4</TableDataCol>
                    <TableDataCol>tamura3@xxx.co.jp</TableDataCol>
                    <TableDataCol>田村3</TableDataCol>
                    <TableDataCol>1986/11/05</TableDataCol>
                    <TableDataCol>38</TableDataCol>
                    <TableDataCol>-</TableDataCol>
                    <TableDataCol>
                        <LinkButton>詳細</LinkButton>
                    </TableDataCol>
                </TableDataRow>
                <TableDataRow>
                    <TableDataCol>5</TableDataCol>
                    <TableDataCol>tamura4@xxx.co.jp</TableDataCol>
                    <TableDataCol>田村4</TableDataCol>
                    <TableDataCol>1986/11/05</TableDataCol>
                    <TableDataCol>38</TableDataCol>
                    <TableDataCol>-</TableDataCol>
                    <TableDataCol>
                        <LinkButton>詳細</LinkButton>
                    </TableDataCol>
                </TableDataRow>
            </template>
        </TableArea>
        <PaginationLink />

        <div class="text-left my-2">
            <label>合計: 11件</label>
        </div>
        <br />
        <ButtonArea>
            <LinkButton>CSV出力</LinkButton>
            <LinkButton v-on:click="onNewUserButonClicked">新規ユーザ登録</LinkButton>
        </ButtonArea>
    </MainContainer>
</template>