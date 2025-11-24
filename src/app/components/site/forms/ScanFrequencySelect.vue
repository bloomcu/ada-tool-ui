<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <select
      :class="classes"
      v-model="localValue"
      aria-label="Scan Frequency"
    >
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => ([{ value: 'manual', label: 'Manual' }, { value: 'quarterly', label: 'Quarterly' }]) },
  label: { type: String, default: 'Scan Frequency' },
  classes: { type: String, default: 'border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' }
})
const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style scoped>
select {
  width: 100%;
  padding: 0.5rem 0.625rem;
}
</style>
