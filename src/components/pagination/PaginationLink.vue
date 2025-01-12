<script setup lang="ts">
//TODO: ページネーションの部品化検討中

// https://tailwindui.com/components/application-ui/navigation/pagination を参考に作成
</script>

<template>
    <div class="flex items-center justify-between border-t border-stone-200 py-3">
        <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white" aria-label="Pagination">
                <a href="#"
                    class="text-md relative inline-flex items-center rounded-l-md px-2 py-2 text-stone-500 ring-1 ring-inset ring-stone-300 bg-stone-200 focus:z-20 focus:outline-offset-0">
                    <span>最初へ</span>
                </a>
                <a href="#"
                    class="text-md relative inline-flex items-center px-2 py-2 text-stone-500 ring-1 ring-inset ring-stone-300 bg-stone-200 focus:z-20 focus:outline-offset-0">
                    <span>前へ</span>
                </a>
                <a href="#" aria-current="page"
                    class="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                <a href="#"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-600 ring-1 ring-inset ring-stone-300 hover:bg-stone-50 focus:z-20 focus:outline-offset-0">2</a>
                <a href="#"
                    class="relative hidden items-center px-4 py-2 text-sm font-semibold text-blue-600 ring-1 ring-inset ring-stone-300 hover:bg-stone-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                <a href="#"
                    class="relative inline-flex items-center px-2 py-2 text-blue-600 ring-1 ring-inset ring-stone-300 hover:bg-stone-50 focus:z-20 focus:outline-offset-0">
                    <span>次へ</span>
                </a>
                <a href="#"
                    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-blue-600 ring-1 ring-inset ring-stone-300 hover:bg-stone-50 focus:z-20 focus:outline-offset-0">
                    <span>最後へ</span>
                </a>
            </nav>
        </div>
    </div>

</template>