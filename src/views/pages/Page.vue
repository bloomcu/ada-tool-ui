<template>
  <LayoutDefault v-if="pageStore.page">
    <!-- Header -->
    <AppHeader>
      <div>
        <h1 class="mb-2 text-3xl font-medium leading-6 text-gray-900">{{ pageStore.page.title }}</h1>
        <a :href="pageStore.page.results.eval_url" target="_blank" class="text-indigo-600 hover:text-indigo-900">{{ pageStore.page.results.eval_url }}</a>
      </div>
      <AppButton :to="{ name: 'scan' }" variant="secondary">Back</AppButton>
    </AppHeader>

    <div class="flex flex-row items-start gap-x-6">
      <!-- Rule results -->
      <AppCard v-if="pageStore.page.results" class="mb-12 w-full">
        <h2 class="text-base font-medium leading-6 text-gray-900">{{ pageStore.page.results.rule_results.length }} Rule Results</h2>

        <div class="mt-4 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table v-if="pageStore.page.results.rule_results" class="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">Rule Id</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Pass</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Fail</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Warning</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Hidden</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="result in pageStore.page.results.rule_results" :key="result.rule_id" class="hover:bg-gray-50 cursor-pointer">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ result.rule_id }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" >{{ result.elements_passed }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" :class="{'bg-red-100': result.elements_failure > 0}">{{ result.elements_failure }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" :class="{'bg-yellow-100': result.elements_warning > 0}">{{ result.elements_warning }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ result.elements_hidden }}</td>
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
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'

const route = useRoute()
const pageStore = usePageStore()

onMounted(() => {
  pageStore.show(route.params.scan, route.params.page)
})
</script>
