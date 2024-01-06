<template>
    <LayoutDefault>
        This is a space to test components.
        <AppCard padding="sm" class="w-60">            
            <AppNestedMenu 
                title="Category"
                :options="categories"
                :active="query.category"
                @selected="setCategory"
            />
        </AppCard>
    </LayoutDefault>
</template>

<script setup>
import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppNestedMenu from '@/app/components/base/nested-menu/AppNestedMenu.vue'
import useQuery from '@/app/composables/base/useQuery.js'

const {query, set} = useQuery()

const categories = [
    {title: 'Parent A', slug: 'parent-a'},
    {title: 'Parent B', slug: 'parent-b', children: [
        {title: 'Child 1', slug: 'child-1'},
        {title: 'Child 2', slug: 'child-2', children: [
            {title: 'Grandchild 1', slug: 'grandchild-1'},
            {title: 'Grandchild 2', slug: 'grandchild-2'},
        ]},
    ]},
]

function setCategory(slug) {
    set('category', slug)
}
</script>
