<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean,
  type?: 'primary' | 'basic'
}>();

const emit = defineEmits<{(e: 'click', event: Event): void }>();
</script>

<template>
  <button
    class="font-medium p-2 rounded"
    :class="{
      'bg-indigo-200 font-medium px-4 py-1 rounded hover:transition hover:bg-indigo-300':
        props.type === 'primary',
      'cursor-auto opacity-50 bg-slate-200 hover:bg-slate-200': props.disabled
    }"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
