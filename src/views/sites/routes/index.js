import Sites from '@/views/sites/Sites.vue'
import SitesEdit from '@/views/sites/SitesEdit.vue'

export default [
  {
    path: "/:organization/sites",
    name: "sites",
    component: Sites,
  },
  {
    path: "/:organization/sites/:site",
    name: "sitesEdit",
    component: SitesEdit,
  },
]
