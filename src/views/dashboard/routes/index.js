import Dashboard from '@/views/dashboard/Dashboard.vue'

export default [
  {
    path: "/:organization",
    name: "dashboard",
    component: Dashboard,
  },
]
