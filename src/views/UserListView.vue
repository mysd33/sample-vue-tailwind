<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import TableArea from '@/components/table/TableArea.vue';
import TableHeaderRow from '@/components/table/TableHeaderRow.vue';
import TableHeaderCol from '@/components/table/TableHeaderCol.vue';
import TableDataRow from '@/components/table/TableDataRow.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import TableDataCol from '@/components/table/TableDataCol.vue';
const title = 'ユーザ管理';

</script>

<template>
    <HeaderArea v-bind:title="title" />
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
            </template>
        </TableArea>
        <div class="text-left my-2">
            TBD: ページング
        </div>
        <div class="text-left my-2">
            <label>合計: 11件</label>
        </div>
        <br />
        <div class="flex flex-row gap-2">
            <LinkButton>CSV出力</LinkButton>
            <LinkButton>新規ユーザ登録</LinkButton>
        </div>
    </MainContainer>
</template>