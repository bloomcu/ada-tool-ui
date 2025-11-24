<template>
  <AppModal 
    size="md"
    @closed="siteStore.toggleEditModal" 
    :open="siteStore.editModalOpen"
  >
    <div class="flex justify-between">
      <h3 class="text-lg font-medium leading-7 text-gray-900 tracking-tight sm:truncate sm:text-2xl">Edit site</h3>  
      <AppButton variant="warning" @click="destroy(siteStore.site.id)">Delete Site</AppButton>
    </div>
    
    <form action="#" @submit.prevent="update()" class="flex flex-col gap-3">
      <ScanFrequencySelect v-model="siteStore.site.scan_schedule" />
      <AppInput v-model="siteStore.site.title" label="Title" placeholder="Primary Website" required />
      <AppInput v-model="siteStore.site.domain" label="Domain" placeholder="acmecu.com" required />
      <AppInput
        v-model="siteStore.site.scan_notification_emails"
        label="Notification emails"
        placeholder="accessibility@example.com, dev@example.com"
      />
      <AppButton :loading="siteStore.loading" class="w-full">Update</AppButton>
    </form>
  </AppModal>
</template>

<script setup>
import { useSiteStore } from '@/domain/sites/store/useSiteStore'
import ScanFrequencySelect from '@/app/components/site/forms/ScanFrequencySelect.vue'

const emit = defineEmits(['deleted']);

const siteStore = useSiteStore()

function update() {
  siteStore.update().then(() => {
    siteStore.toggleEditModal()
  })
}
function destroy(id) {
  siteStore.destroy(id).then(() => {
    emit('deleted')
  })
}
</script>
