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
        <label for="" class="text-xs"><input type="checkbox" v-model="filterResults" class="mr-1">Hide rules with no warnings/violations</label>

        <!-- How to read this table. No counts here on purpose: a number that can drift
             out of step with the rows is worse than no number. -->
        <div class="mt-6 rounded-md bg-yellow-50 p-4 ring-1 ring-inset ring-yellow-600/20">
          <div class="flex gap-x-3">
            <InformationCircleIcon class="h-5 w-5 flex-none text-yellow-600" aria-hidden="true"/>
            <div class="text-sm">
              <h3 class="font-medium text-yellow-900">How to read this table</h3>
              <p v-if="hasClientReviewableResults" class="mt-1 text-yellow-800">
                Start with lines marked "Metrifi Client: review first." They are heading, link, image, or table issues, which you can often resolve
                yourself by making changes in the CMS.
              </p>
              <!-- Violation/warning is AInspector's required-vs-recommended split, not a severity
                   scale. See opena11y.github.io/evaluation-library/concepts.html
                   The gap after each dt is mr-1, not a source-level space: Vue's whitespace
                   condensing drops the newline between dt and dd. -->
              <dl class="mt-2 space-y-1 text-yellow-800">
                <div>
                  <dt class="inline font-medium mr-1">Violations</dt>
                  <dd class="inline">are failures of a required rule &mdash; a WCAG conformance requirement. Resolve these
                    wherever possible.</dd>
                </div>
                <div>
                  <dt class="inline font-medium mr-1">Warnings</dt>
                  <dd class="inline">are failures of a recommended rule &mdash; a best practice rather than a strict WCAG
                    requirement. Still worth resolving where you can: they can cause confusion and introduce on-page SEO
                    issues.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div class="mt-4 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table v-if="pageStore.page.results.rule_results" class="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">Rule Id</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Pass</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Violations</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Warnings</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Hidden</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="result in filteredResults" :key="result.rule_id" class="hover:bg-gray-50">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <div class="flex items-center gap-x-2 whitespace-nowrap">
                        {{ result.rule_id }}

                        <!-- Failing rule that is often editable in a CMS.
                             Deliberately a flat, dotted tag: the filled chips in this table are
                             buttons, so a label must not borrow their look. -->
                        <span
                          v-if="result.customer_reviewable"
                          title="This issue is often resolvable by making content changes in your CMS."
                          class="inline-flex items-center gap-x-1.5 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-700/40"
                        >
                          <svg class="h-1.5 w-1.5 fill-yellow-600" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3"/></svg>
                          <span><strong>Metrifi Client:</strong> review first</span>
                        </span>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" >{{ result.elements_passed }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <!-- Only offer the slideout when there is something in it to see -->
                      <button
                        v-if="result.elements_violation > 0"
                        @click="setActiveRule(result, 'V')"
                        :aria-label="`View ${result.elements_violation} violating elements for ${result.rule_id}`"
                        class="inline-flex items-center gap-x-1.5 rounded-md bg-red-200 px-2.5 py-1 font-medium text-red-900 ring-1 ring-inset ring-red-700/20 hover:bg-red-300 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                      >
                        {{ result.elements_violation }}
                        <MagnifyingGlassIcon class="h-3.5 w-3.5" aria-hidden="true"/>
                      </button>
                      <span v-else>{{ result.elements_violation }}</span>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <button
                        v-if="result.elements_warning > 0"
                        @click="setActiveRule(result, 'W')"
                        :aria-label="`View ${result.elements_warning} warning elements for ${result.rule_id}`"
                        class="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-200 px-2.5 py-1 font-medium text-yellow-900 ring-1 ring-inset ring-yellow-700/20 hover:bg-yellow-300 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700"
                      >
                        {{ result.elements_warning }}
                        <MagnifyingGlassIcon class="h-3.5 w-3.5" aria-hidden="true"/>
                      </button>
                      <span v-else>{{ result.elements_warning }}</span>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ result.elements_hidden }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AppCard> <!-- end users table -->
    </div>
    <Slideout :rule="activeRule" :open="showSlideOut" @close="removeActiveRule()"></Slideout>
  </LayoutDefault>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { usePageStore } from '@/domain/pages/store/usePageStore'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import Slideout from './slideout/Slideout.vue'

const route = useRoute()
const pageStore = usePageStore()
const activeRule = reactive({
  rule:{},
  scope:''
});
const filterResults = ref(true);
const showSlideOut = ref(false);

const filteredResults = computed(()=>{
  if(filterResults.value) {
      return pageStore.page.results.rule_results.filter((el)=>{
      return el.elements_violation > 0 || el.elements_warning > 0
    })
  } else {
    return pageStore.page.results.rule_results;
  }
  
});

const hasClientReviewableResults = computed(()=>{
  return pageStore.page.results.rule_results.some(el => el.customer_reviewable)
});

function setActiveRule(rule, scope) {
  
  showSlideOut.value = true;
  activeRule.rule = rule;
  activeRule.scope = scope;
}
function removeActiveRule() {
  showSlideOut.value = false;
  activeRule.rule = {};
  activeRule.scope = '';
}

onMounted(() => {
  pageStore.show(route.params.scan, route.params.page)
})
</script>
