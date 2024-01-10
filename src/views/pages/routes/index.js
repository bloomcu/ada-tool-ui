import Page from '@/views/pages/Page.vue'

export default [
  {
    path: "/:organization/scans/:scan/pages/:page",
    name: "page",
    component: Page,
  },
]
