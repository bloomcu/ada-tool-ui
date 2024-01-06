import auth from '@/views/base/auth/routes/index.js'
import common from '@/views/base/common/routes/index.js'
import invitations from '@/views/base/invitations/routes/index.js'
import organizations from '@/views/base/organizations/routes/index.js'
import settings from '@/views/base/settings/routes/index.js'
import subscriptions from '@/views/base/subscriptions/routes/index.js'

const baseRoutes = [
  ...auth,
  ...common,
  ...invitations,
  ...organizations,
  ...settings,
  ...subscriptions,
]

export default baseRoutes
