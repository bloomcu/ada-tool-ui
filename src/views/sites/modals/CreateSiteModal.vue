<template>
  <AppModal 
    size="md"
    @closed="siteStore.toggleCreateModal" 
    :open="siteStore.createModalOpen"
  >
    <form action="#" @submit.prevent="create()" class="flex flex-col gap-3">
      <h3 class="text-lg font-medium leading-7 text-gray-900 tracking-tight sm:truncate sm:text-2xl">Create site</h3>
      <AppInput v-model="newSite.title" label="Title" placeholder="Primary Website" required />
      <AppInput v-model="newSite.domain" label="Domain" placeholder="acmecu.com" required />
      <AppButton :loading="siteStore.loading" class="w-full">Create</AppButton>
    </form>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteStore } from '@/domain/sites/store/useSiteStore'

const siteStore = useSiteStore()

const newSite = ref({
  title: '',
  url: 'https://',
})

function create() {
  siteStore.store(newSite.value)
    .then(() => {
      siteStore.toggleCreateModal()
      
      newSite.value = {
        title: '',
        url: '',
      }
    })
}
</script>
