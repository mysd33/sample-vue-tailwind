<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import TableArea from '@/components/table/TableArea.vue'
import TableHeaderRow from '@/components/table/TableHeaderRow.vue'
import TableHeaderCol from '@/components/table/TableHeaderCol.vue'
import TableDataRow from '@/components/table/TableDataRow.vue'
import PaginationLink from '@/components/pagination/PaginationLink.vue'
import LinkButton from '@/components/button/LinkButton.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import TableDataCol from '@/components/table/TableDataCol.vue'
import { useRouter } from 'vue-router'
import ActionButton from '@/components/button/ActionButton.vue'
import { UserRepository } from '@/usecases/common/repositories/UserRepository'
import type { User } from '@/usecases/common/models/User'
import { UserService } from '@/usecases/user/services/UserService'
import { formatDate, calcAge } from '@/usecases/common/utils/date_utils'
import { Pageable } from '@/components/pagination/pagination'

const pageSize = 5

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

const users = ref<User[]>([])
const totalCount = ref(0)

const router = useRouter()
const onDetailButtonClicked = () => {
  // 仮のidで遷移
  router.push({ name: 'userDetail', params: { id: 1 } })
}

// 初期表示処理
onMounted(async () => {
  // ユーザ一覧を取得
  const userPage = await userService.findAllForPageNation(new Pageable(pageSize, 0))
  users.value = userPage.content
  totalCount.value = userPage.totalElements
})
</script>

<template>
  <HeaderArea title="ユーザ管理">
    <LinkButton :outline="true" forward-view-name="menu">メニューに戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
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
        <TableDataRow v-for="(user, index) in users" :key="user.id">
          <TableDataCol>{{ index + 1 }}</TableDataCol>
          <TableDataCol>{{ user.id }}</TableDataCol>
          <TableDataCol>{{ user.lastName }}{{ user.firstName }}</TableDataCol>
          <TableDataCol>{{ formatDate(user.birthday) }}</TableDataCol>
          <TableDataCol>{{ calcAge(user.birthday) }}</TableDataCol>
          <TableDataCol>{{ user.isAdmin ? '○' : '-' }}</TableDataCol>
          <TableDataCol>
            <LinkButton @click="onDetailButtonClicked">詳細</LinkButton>
          </TableDataCol>
        </TableDataRow>
      </template>
    </TableArea>
    <PaginationLink />

    <div class="my-2 text-left">
      <label>合計: {{ totalCount }}件</label>
    </div>
    <br />
    <ButtonArea>
      <ActionButton>CSV出力</ActionButton>
      <LinkButton forward-view-name="newUser">新規ユーザ登録</LinkButton>
    </ButtonArea>
  </MainContainer>
</template>
