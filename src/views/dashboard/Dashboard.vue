<template>
  <LayoutWithSidebar>
    <template #topbar>
      <h1 class="text-2xl font-medium leading-6 text-gray-900 tracking-tight">Dashboard</h1>
    </template>

    <div class="max-w-2xl">
      Maybe show a graph here and latest scans below.
    </div>
    
  </LayoutWithSidebar>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/20/solid'
import LayoutWithSidebar from '@/app/layouts/LayoutWithSidebar.vue'
</script>
