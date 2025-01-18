<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { ref } from 'vue';

interface Props {
    enabled: boolean
}

const props = defineProps<Props>()

const switchOn = ref(props.enabled)

</script>
<template>
    <SwitchGroup>
        <div>
            <Switch v-model="switchOn" :class="switchOn ? 'bg-blue-600' : 'bg-white border border-gray-300'"
                class="group relative inline-flex h-5 w-9 mr-2 items-center rounded-full shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50">
                <span :class="switchOn ? 'translate-x-5 bg-white' : 'translate-x-1 bg-gray-400'"
                    class="inline-block h-3 w-3 transform rounded-full transition group-focus:bg-blue-400"></span>
            </Switch>
            <SwitchLabel>
                <slot></slot>
            </SwitchLabel>
        </div>
    </SwitchGroup>
</template>
