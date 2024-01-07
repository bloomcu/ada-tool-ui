<template>
  <AppModal 
    size="md"
    @closed="siteStore.toggleEditModal" 
    :open="siteStore.editModalOpen"
  >
    <form action="#" @submit.prevent="update()" class="flex flex-col gap-3">
      <h3 class="text-lg font-medium leading-7 text-gray-900 tracking-tight sm:truncate sm:text-2xl">Edit site</h3>
      <AppInput v-model="siteStore.site.title" label="Title" placeholder="Primary Website" required />
      <AppInput v-model="siteStore.site.domain" label="Domain" placeholder="acmecu.com" required />
      <AppButton :loading="siteStore.loading" class="w-full">Update</AppButton>
    </form>
  </AppModal>
</template>

<script setup>
import { useSiteStore } from '@/domain/sites/store/useSiteStore'

const siteStore = useSiteStore()

function update() {
  siteStore.update().then(() => {
    siteStore.toggleEditModal()
  })
}
</script>
