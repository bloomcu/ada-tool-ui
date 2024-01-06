<template>
  <LayoutDefault v-if="siteStore.site">
    <!-- Header -->
    <AppHeader>
      <div>
        <h1 class="text-3xl font-medium leading-6 text-gray-900">Edit site</h1>
        <p class="leading-6 text-gray-500 mt-2">{{ siteStore.site.domain }}</p>
      </div>
      <AppButton :to="{ name: 'sites' }" variant="secondary">Back</AppButton>
    </AppHeader>

    <div class="flex flex-row items-start gap-x-6">
      <!-- General -->
      <AppCard padding="sm" class="flex-1">
        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-medium leading-7 text-gray-900 tracking-tight sm:truncate sm:text-2xl">General</h3>
          <AppInput v-model="siteStore.site.title" label="Title" required />
          <AppInput v-model="siteStore.site.domain" label="Domain" required />
          <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-4">
            <AppButton @click="siteStore.update()" :loading="siteStore.isLoading">Update</AppButton>
          </div>
        </div>
      </AppCard>
    </div>
  </LayoutDefault>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteStore } from '@/domain/sites/store/useSiteStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'

const route = useRoute()
const siteStore = useSiteStore()

onMounted(() => {
    siteStore.show(route.params.site)
})
</script>
