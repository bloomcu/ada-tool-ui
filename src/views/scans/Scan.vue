<template>
  <LayoutDefault v-if="scanStore.scan">
    <!-- Header -->
    <AppHeader>
      <div>
        <h1 class="text-3xl font-medium leading-6 text-gray-900">
          Ran {{ moment(scanStore.scan.created_at).fromNow() }} on {{ scanStore.scan.site.domain }}
        </h1>
        <p class="leading-6 text-gray-400 mt-2">Status: {{ scanStore.scan.status }}</p>
      </div>
      <AppButton :to="{ name: 'scans' }" variant="secondary">Back</AppButton>
    </AppHeader>

    <div class="flex flex-row items-start gap-x-6">
      <!-- Conditional import button -->
      <AppButton v-if="scanStore.scan.status == 'SUCCEEDED' && !scanStore.scan.pages.length" @click="importDataset(scanStore.scan.id)" :loading="isImporting">
        Import Results
      </AppButton>
      
      <!-- Scanned pages -->
      <AppCard v-if="scanStore.scan.pages.length" class="mb-12 w-full">
        <h2 class="text-base font-medium leading-6 text-gray-900">Scanned {{ scanStore.scan.pages.length }} pages</h2>
        <table class="divide-y divide-gray-300 table-fixed">
          <thead>
            <tr>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Total Pages with Violations</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Total Pages with Warnings</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">Avg Violations/Page</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Avg Warnings/Page</th>
              
              
            </tr>
          </thead>  
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ scanStore.scan.violation_count_pages  }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ scanStore.scan.warning_count_pages }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ scanStore.scan.violation_count/scanStore.scan.violation_count_pages }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ scanStore.scan.warning_count/scanStore.scan.warning_count_pages }}</td>
              
              
            </tr>
          </tbody>

        </table>
        <div class="mt-4 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8">
            <div class="">
              <table class="min-w-full divide-y divide-gray-300 table-fixed max-w-full">
                <thead>
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">Title</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Url</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Rule Results</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="page in scanStore.scan.pages" :key="page.id" @click="showPage(page.id)" class="hover:bg-gray-50 cursor-pointer" :class="{'bg-red-100':	scanStore.scan.violation_count/scanStore.scan.violation_count_pages < page.violation_count}">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ page.title }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ page.results.eval_url }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <table>
                        <tr>
                          <th class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">V</th>
                          <th class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">W</th>
                        </tr>
                        <tr>
                          <td class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">{{ page.violation_count }}</td>
                          <td class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">{{page.warning_count}}</td>
                        </tr>
                      </table>
                       
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AppCard> <!-- end users table -->
    </div>
  </LayoutDefault>
</template>

<script setup>
import moment from 'moment'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScanStore } from '@/domain/scans/store/useScanStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'

const isImporting = ref(false)
const router = useRouter()
const route = useRoute()
const scanStore = useScanStore()

async function importDataset(scanId) {
  isImporting.value = true
  
  await scanStore.importDataset(scanId).then(() => {
    isImporting.value = false
    scanStore.show(route.params.scan)
  })
}

async function showPage(pageId) {
  router.push({ name: 'page', params: { scan: route.params.scan, page: pageId } })
}

onMounted(() => {
  scanStore.show(route.params.scan).then(() => {
    scanStore.checkStatus(route.params.scan)
  })
})
</script>
