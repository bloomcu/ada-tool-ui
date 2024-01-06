import Scans from '@/views/scans/Scans.vue'
import ShowScan from '@/views/scans/ShowScan.vue'

export default [
  {
    path: "/:organization/scans",
    name: "scans",
    component: Scans,
  },
  {
    path: "/:organization/scans/:scan",
    name: "showScan",
    component: ShowScan,
  },
]
