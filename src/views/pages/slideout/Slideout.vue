<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="handleDialogClose()">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="handleDialogClose()">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                        <h2 class="text-xl font-medium leading-6 text-gray-900 mb-2">Rule ID: {{ rule.rule.rule_id }}</h2>
                        <p class="mb-2 text-red-500">{{ rule.rule.rule_summary }}</p>
                        <div v-if="ruleLookup(rule.rule.rule_id)" class="mb-6">
                          <app-button class="inline-block" is="a" target="_blank" rel="noopener noreferrer" :href="ruleLookup(rule.rule.rule_id)">
                            Help Available
                          </app-button>
                        </div>
                        
                        <ul role="list" class="space-y-6" v-if="Object.keys(rule.rule).length && rule.rule.element_results.filter((el)=>{ return el.result_value_nls === rule.scope}).length">
                            <li v-for="result in rule.rule.element_results.filter((el)=>{ return el.result_value_nls === rule.scope})" class="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
                                
                                <table class="min-w-full divide-y divide-gray-300" >
                                    <tr>
                                        <th class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">Message</th>
                                        <td class="py-3.5 pl-4 pr-3 text-left text-sm font-light text-gray-500 sm:pl-0">{{result.message}}</td>
                                    </tr>
                                    <tr v-if="result.id">
                                        <th v-if="result.id" class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">ID</th>
                                        <td v-if="result.id" class="py-3.5 pl-4 pr-3 text-left text-sm font-light text-gray-500 sm:pl-0">{{result.id}}</td>
                                    </tr>
                                    <tr v-if="result.class">
                                        <th v-if="result.class" class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">Class</th>
                                        <td v-if="result.class" class="py-3.5 pl-4 pr-3 text-left text-sm font-light text-gray-500 sm:pl-0">{{result.class}}</td>
                                    </tr>
                                    <tr v-if="result.element_identifier">
                                        <th  class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">Identifier</th>
                                        <td v-if="result.element_identifier" class="py-3.5 pl-4 pr-3 text-left text-sm font-light text-gray-500 sm:pl-0">{{result.element_identifier}}</td>
                                    </tr>
                                </table>
                            </li>

                            <!-- More items... -->
                        </ul>
                       
                        
                        <!-- <pre>
                            {{ rule }}
                        </pre> -->
                        
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  const props = defineProps([
    'rule',
    'open'
  ]);

  const rule_help_links = {
    // Tables without role "presentation"
    'TABLE_1': 'https://support.bloomcu.com/hc/en-us/articles/16905884197140-How-to-fix-the-error-Data-tables-must-have-a-name',
    'TABLE_2': 'https://support.bloomcu.com/hc/en-us/articles/16905884197140-How-to-fix-the-error-Data-tables-must-have-a-name',
    // unique sibling headings
    'HEADING_3' :'https://support.bloomcu.com/hc/en-us/articles/16905860032916-How-to-Fix-the-error-Sibling-headings-must-be-unique',
    // unique link text
    'LINK_2' :' https://support.bloomcu.com/hc/en-us/articles/16905884219412-How-to-fix-error-Link-Text-Should-be-Unique',
    // headings out or order
    'HEADING_5': 'https://support.bloomcu.com/hc/en-us/articles/16905875239700-How-to-fix-the-error-Improperly-Nested-Headings',
    'HEADING_8' : 'https://support.bloomcu.com/hc/en-us/articles/16905875239700-How-to-fix-the-error-Improperly-Nested-Headings',
    
    // IFrames without titles
    'FRAME_2' : 'https://support.bloomcu.com/hc/en-us/articles/16905875275668-How-to-fix-the-error-Iframe-must-have-accessible-name',
    'COLOR_1' :'/test'
  }
  /**
   * 
   * @param {*} rule_id 
   * @description lookup rules that we have self-help docs for and return the link
   * @todo Make this rule list dynamic and backend editable
   */
  function ruleLookup(rule_id) {
    if(Object.hasOwn(rule_help_links, rule_id)) {
      return rule_help_links[rule_id];
    }
    return false;
  }

  const emit = defineEmits();

  function handleDialogClose() {
    emit('close');
  }
//   const open = ref(true)
  
  </script>