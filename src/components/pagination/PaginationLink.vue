<script setup lang="ts" generic="T">
// 参考
// https://tailwindui.com/components/application-ui/navigation/pagination を参考に作成

import { defineProps, defineEmits, computed } from 'vue'
import { Pageable, Page } from '@/components/pagination/pagination'

// Propsのインターフェース定義
interface Props<T> {
  pageSize: number
  page: Page<T>
}

// Emitsのインターフェース定義
interface Emits {
  (e: 'onClick', pageable: Pageable): void
}

// プロパティの定義
const props = defineProps<Props<T>>()

// エミットの定義
const emit = defineEmits<Emits>()

// 総ページ数を計算するcomputedプロパティ
const totalPages = computed(() => {
  return Math.ceil(props.page.totalElements / props.pageSize)
})

// ページリンクがクリックされたときのハンドラ
function handleClick(pageIndex: number) {
  // クリックされたページ番号からオフセットを計算
  const realPageNumber = pageIndex - 1
  const offset = realPageNumber * props.pageSize
  emit('onClick', new Pageable(props.pageSize, realPageNumber, offset))
}
</script>

<template>
  <div class="flex items-center justify-between border-t border-gray-200 py-3">
    <div>
      <!-- TODO: ページネーションの有効化・無効化状態での動的なスタイル変更　-->
      <nav
        class="isolate inline-flex -space-x-px rounded-md bg-white shadow-xs"
        aria-label="Pagination">
        <a
          href="#"
          class="text-md relative inline-flex items-center rounded-l-md bg-gray-200 px-2 py-2 text-gray-500 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0"
          @click.prevent.stop="handleClick(1)">
          <span>最初へ</span>
        </a>
        <a
          href="#"
          class="text-md relative inline-flex items-center bg-gray-200 px-2 py-2 text-gray-500 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0"
          @click.prevent.stop="handleClick(props.page.pageNumber)">
          <span>前へ</span>
        </a>
        <a
          v-for="pageIndex in totalPages"
          :key="pageIndex"
          href="#"
          :aria-current="pageIndex === props.page.pageNumber ? 'page' : undefined"
          :class="
            pageIndex === props.page.pageNumber + 1
              ? 'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-600 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
          "
          @click.prevent.stop="handleClick(pageIndex)">
          {{ pageIndex }}
        </a>
        <a
          href="#"
          class="relative inline-flex items-center px-2 py-2 text-blue-600 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          @click.prevent.stop="handleClick(props.page.pageNumber + 2)">
          <span>次へ</span>
        </a>
        <a
          href="#"
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-blue-600 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          @click.prevent.stop="handleClick(totalPages)">
          <span>最後へ</span>
        </a>
      </nav>
    </div>
  </div>
</template>
