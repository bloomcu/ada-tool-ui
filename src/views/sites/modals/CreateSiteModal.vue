<template>
  <AppModal 
    size="md"
    @closed="siteStore.toggleCreateModal" 
    :open="siteStore.createModalOpen"
  >
    <form action="#" @submit.prevent="create()" class="flex flex-col gap-3">
      <h3 class="text-lg font-medium leading-7 text-gray-900 tracking-tight sm:truncate sm:text-2xl">Create site</h3>
      <ScanFrequencySelect v-model="newSite.scan_schedule" />
      <AppInput v-model="newSite.title" label="Title" placeholder="Primary Website" required />
      <AppInput v-model="newSite.domain" label="Domain" placeholder="acmecu.com" required />
      <AppInput
        v-model="newSite.scan_notification_emails"
        label="Notification emails"
        placeholder="accessibility@example.com, dev@example.com"
      />
      <AppButton :loading="siteStore.loading" class="w-full">Create</AppButton>
    </form>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteStore } from '@/domain/sites/store/useSiteStore'
import ScanFrequencySelect from '@/app/components/site/forms/ScanFrequencySelect.vue'

const siteStore = useSiteStore()

const newSite = ref({
  title: '',
  url: 'https://',
  scan_schedule: 'manual',
  scan_notification_emails: '',
})

function create() {
  siteStore.store(newSite.value)
    .then(() => {
      siteStore.toggleCreateModal()
      
      newSite.value = {
        title: '',
        url: 'https://',
        scan_schedule: 'manual',
        scan_notification_emails: '',
      }
    })
}
</script>
