import { defineStore, acceptHMRUpdate } from 'pinia'
import { scanApi as ScanApi } from '@/domain/scans/api/scanApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useScanStore = defineStore('scanStore', {
    state: () => ({
        scans: [],
        scan: null,
        isLoading: true,
    }),
    
    actions: {
        index(params) {
          const auth = useAuthStore()
          this.isLoading = true
          this.scans = []
          
          ScanApi.index(auth.organization, params)
            .then(response => {
              this.scans = response.data.data
              this.isLoading = false
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async show(id) {
          const auth = useAuthStore()
          
          if (true) {
          // TODO: Work on this
          // if (!this.scan || this.scan.id !== id) {
            
            this.isLoading = true

            await ScanApi.show(auth.organization, id)
            .then(response => {
              this.scan = response.data.data
              this.isLoading = false
            })
          }
        },
        
        async checkStatus(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await ScanApi.checkStatus(auth.organization, id)
            .then(response => {
              this.scan.status = response.data.data
              this.isLoading = false
            })
        },

        async showDataset(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await ScanApi.showDataset(auth.organization, id)
            .then(response => {
              this.scan.dataset = response.data.data
              this.isLoading = false
            })
        },

        async importDataset(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await ScanApi.importDataset(auth.organization, id)
            .then(response => {
              this.scan.dataset = response.data.data
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
    import.meta.hot.accept(acceptHMRUpdate(useScanStore, import.meta.hot))
}
