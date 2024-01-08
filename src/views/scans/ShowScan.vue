<template>
  <LayoutDefault v-if="scanStore.scan">
    <!-- Header -->
    <AppHeader>
      <div>
        <h1 class="text-3xl font-medium leading-6 text-gray-900">
          Ran {{ moment(scanStore.scan.created_at).fromNow() }} on {{ scanStore.scan.site.domain }}
        </h1>
        <p class="leading-6 text-gray-400 mt-2">Status: (Insert run status)</p>
      </div>
      <AppButton :to="{ name: 'scans' }" variant="secondary">Back</AppButton>
    </AppHeader>

    <div class="flex flex-row items-start gap-x-6">
      <AppCard padding="sm" class="flex-1">
        List evaluations here...
      </AppCard>
    </div>
  </LayoutDefault>
</template>

<script setup>
import moment from 'moment'
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
