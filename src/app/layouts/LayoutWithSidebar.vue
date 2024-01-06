<template>
  <div>
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false"/>

    <main class="py-4 lg:pl-72">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <!-- Topbar -->
          <div class="flex items-center gap-x-4 mt-4 mb-12">
            <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Separator -->
            <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
            
            <div class="flex items-center justify-between w-full">
              <slot name="topbar"/>
            </div>
          </div>

          <slot/>
        </div>
      </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import AppSidebar from '@/app/components/navigation/AppSidebar.vue'
import AppTopNavigation from '@/app/components/navigation/AppTopNavigation.vue'

const sidebarOpen = ref(false)
</script>
