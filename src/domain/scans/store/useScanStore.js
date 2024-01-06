import { defineStore, acceptHMRUpdate } from 'pinia'
import { scanApi as ScanApi } from '@/domain/scans/api/scanApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useScanStore = defineStore('scanStore', {
    state: () => ({
        scans: [],
        scan: null,
        isLoading: true,
    }),

    getters: {
      launch: (state) => state.scan.launch_info
    },
    
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
        
        async store(scan) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await ScanApi.store(auth.organization, scan)
            .then(response => {
              this.scans.push(response.data.data)
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        show(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          ScanApi.show(auth.organization, id)
            .then(response => {
              this.scan = response.data.data
              this.isLoading = false
            })
        },
        
        update() {
          const auth = useAuthStore()
          this.isLoading = true
          
          ScanApi.update(auth.organization, this.scan.id, this.scan)
            .then(response => {
              console.log('Scan successfully updated')
              this.isLoading = false
            })
        },
        
        destroy(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          ScanApi.destroy(auth.organization, id)
            .then(response => {
              this.scans = this.scans.filter((scan) => scan.id !== id)
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
