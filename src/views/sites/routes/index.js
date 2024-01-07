import Sites from '@/views/sites/Sites.vue'
import ShowSite from '@/views/sites/ShowSite.vue'

export default [
  {
    path: "/:organization/sites",
    name: "sites",
    component: Sites,
  },
  {
    path: "/:organization/sites/:site",
    name: "showSite",
    component: ShowSite,
  },
]
