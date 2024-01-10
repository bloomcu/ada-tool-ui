import Scans from '@/views/scans/Scans.vue'
import Scan from '@/views/scans/Scan.vue'

export default [
  {
    path: "/:organization/scans",
    name: "scans",
    component: Scans,
  },
  {
    path: "/:organization/scans/:scan",
    name: "scan",
    component: Scan,
  }
]
