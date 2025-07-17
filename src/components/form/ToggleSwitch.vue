<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const switchOn = defineModel<boolean>('enabled')
</script>
<template>
  <!-- TODO: Fieldタグでのバインド対応 -->
  <SwitchGroup>
    <div>
      <Switch
        :class="switchOn ? 'bg-blue-600' : 'border border-gray-300 bg-white'"
        class="group relative mr-2 inline-flex h-5 w-9 items-center rounded-full shadow-xs focus:border-blue-400 focus:ring-3 focus:ring-blue-300/50"
        v-model="switchOn">
        <span
          :class="switchOn ? 'translate-x-5 bg-white' : 'translate-x-1 bg-gray-400'"
          class="inline-block h-3 w-3 transform rounded-full transition group-focus:bg-blue-400"></span>
      </Switch>
      <SwitchLabel>
        <slot></slot>
      </SwitchLabel>
    </div>
  </SwitchGroup>
</template>
