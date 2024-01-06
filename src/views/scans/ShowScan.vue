<template>
  <LayoutDefault v-if="scanStore.scan">
    <!-- Header -->
    <AppHeader>
      <div>
        <h1 class="text-3xl font-medium leading-6 text-gray-900">Edit scan</h1>
        <p class="leading-6 text-gray-500 mt-2">{{ scanStore.scan.domain }}</p>
      </div>
      <AppButton :to="{ name: 'scans' }" variant="secondary">Back</AppButton>
    </AppHeader>

    <div class="flex flex-row items-start gap-x-6">
      <!-- General -->
      <AppCard padding="sm" class="flex-1">
        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-medium leading-7 text-gray-900 tracking-tight sm:truncate sm:text-2xl">General</h3>
          <AppInput v-model="scanStore.scan.title" label="Title" required />
          <AppInput v-model="scanStore.scan.domain" label="Domain" required />
          <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-4">
            <AppButton @click="scanStore.update()" :loading="scanStore.isLoading">Update</AppButton>
          </div>
        </div>
      </AppCard>
    </div>
  </LayoutDefault>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useScanStore } from '@/domain/scans/store/useScanStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'

const route = useRoute()
const scanStore = useScanStore()

onMounted(() => {
  scanStore.show(route.params.scan)
})
</script>
