import { defineStore, acceptHMRUpdate } from 'pinia'
import { pageApi as PageApi } from '@/domain/pages/api/pageApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const usePageStore = defineStore('pageStore', {
    state: () => ({
        pages: [],
        page: null,
        isLoading: true,
    }),
    
    actions: {        
        async show(scanId, pageId) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await PageApi.show(auth.organization, scanId, pageId)
            .then(response => {
              this.page = response.data.data
              this.isLoading = false
            })
        },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
