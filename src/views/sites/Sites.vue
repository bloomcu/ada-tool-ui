<template>
  <LayoutWithSidebar>
    <template #topbar>
      <h1 class="text-2xl font-medium leading-6 text-gray-900 tracking-tight">Sites</h1>
      <AppButton variant="secondary" @click="siteStore.toggleCreateModal">Create site</AppButton>
    </template>

    <!-- Sites -->
    <AppCard v-if="siteStore.sites.length" padding="none">
      <ul role="list" class="divide-y divide-gray-100">
        <li v-for="site in siteStore.sites" :key="site.id" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div class="min-w-0 flex-auto">
            <p class="text-sm leading-5 text-gray-500">{{ site.title }}</p>
            <p class="mt-1 text-base font-medium leading-6 text-gray-900">{{ site.domain }}</p>
            <p class="mt-1 text-base text-indigo-600">{{ site.scans.length }} scans</p>

            <RouterLink :to="{ name: 'showSite', params: { site: site.id } }">
              <span class="absolute inset-x-0 -top-px bottom-0" />
            </RouterLink>
          </div>

          <div class="flex items-center gap-x-4 z-10">
            <AppButton @click="runScan(site.id)">Scan this site</AppButton>
            <AppButton variant="tertiary" :to="{ name: 'showSite', params: { site: site.id } }">View</AppButton>
          </div>
        </li>
      </ul>
    </AppCard>

    <!-- Empty state -->
    <div v-else class="text-center bg-slate-50 rounded-2xl py-12 px-2">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
      <h2 class="mt-2 text-lg font-medium text-gray-900">No sites</h2>
      <p class="mt-1 text-gray-500">Get started by creating a new site.</p>
      <AppButton @click="siteStore.toggleCreateModal" class="mt-4">Create site</AppButton>
    </div>

    <!-- Modal -->
    <CreateSiteModal/>
  </LayoutWithSidebar>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSiteStore } from '@/domain/sites/store/useSiteStore'
import LayoutWithSidebar from '@/app/layouts/LayoutWithSidebar.vue'
import CreateSiteModal from '@/views/sites/modals/CreateSiteModal.vue'

const router = useRouter()
const siteStore = useSiteStore()

async function runScan(siteId) {
  await siteStore.runScan(siteId).then(scan => {
    router.push({ name: 'scan', params: { scan: scan.id } })
  })
}

onMounted(() => {
  siteStore.index()
})
</script>
