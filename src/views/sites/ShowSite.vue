<template>
  <LayoutDefault v-if="siteStore.site">
    <!-- Header -->
    <AppHeader>
      <div>
        <p class="leading-6 text-gray-400">{{ siteStore.site.title }}</p>
        <h1 class="text-3xl font-medium leading-6 text-gray-900 mt-2">{{ siteStore.site.domain }}</h1>
      </div>
      <div class="flex gap-4">
        <AppButton :to="{ name: 'sites' }" variant="secondary">Back</AppButton>
        <AppButton @click="siteStore.toggleEditModal" variant="tertiary">Edit</AppButton>
      </div>
    </AppHeader>

    <!-- Scans -->
    <AppCard v-if="siteStore.site.scans.length" padding="none">
        <ul role="list" class="divide-y divide-gray-100">
          <li v-for="scan in siteStore.site.scans" :key="scan.id" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div class="min-w-0 flex-auto">
              <p class="text-base font-medium leading-6 text-gray-900">
                Ran {{ moment(scan.created_at).fromNow() }}
              </p>
              <p class="mt-2 text-sm leading-5 text-gray-500">Last known status: {{ scan.status }}</p>
              <p class="mt-1 text-sm leading-5 text-gray-500">Scanned {{ scan.page_count }} pages</p>

              <RouterLink :to="{ name: 'scan', params: { scan: scan.id } }">
                <span class="absolute inset-x-0 -top-px bottom-0" />
              </RouterLink>
            </div>

            <div class="flex items-center gap-x-4 z-10">
              <AppButton variant="tertiary" :to="{ name: 'scan', params: { scan: scan.id } }">View</AppButton>
            </div>
          </li>
        </ul>
      </AppCard>

      <!-- Empty state -->
      <div v-else class="text-center bg-slate-50 rounded-2xl py-12 px-2">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h2 class="mt-2 text-lg font-medium text-gray-900">No scans</h2>
        <p class="mt-1 text-gray-500">This site has not been scanned.</p>
        <AppButton @click="runScan(siteStore.site.domain)" variant="primary" class="mt-4">Scan this site</AppButton>
      </div>

    <!-- Modal -->
    <EditSiteModal/>
  </LayoutDefault>
</template>

<script setup>
import moment from 'moment'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteStore } from '@/domain/sites/store/useSiteStore'
import { useScanStore } from '@/domain/scans/store/useScanStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import EditSiteModal from '@/views/sites/modals/EditSiteModal.vue'

const route = useRoute()
const siteStore = useSiteStore()
const scanStore = useScanStore()

async function runScan(domain) {
  scanStore.store(domain).then(() => {
    siteStore.show(route.params.site)
  })
}

onMounted(() => {
    siteStore.show(route.params.site)
})
</script>
