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

        async rescanPage(site_id, scan_id, page_id) {
          const auth = useAuthStore();
          await ScanApi.rescanPage(auth.organization, site_id, scan_id, page_id)
          .then(response => {
            // add rescan to page
            this.scan.pages.find(el=>el.id == page_id).rescan = response.data.data;
            
          });

        },

        async importPageDataset(site_id, scan_id, page_id) {
          const auth = useAuthStore();
          await ScanApi.importPageDataset(auth.organization, site_id, scan_id, page_id)
          .then(() => {
            let scanned_page = this.scan.pages.find(el=>el.id == page_id);
            scanned_page.rescan = null;
          })
        },

        async checkPageScanStatus(page_id, scan_id) {
          const auth = useAuthStore();
          await ScanApi.checkPageScanStatus(auth.organization,scan_id)
          .then(response => {
            
            let scanned_page = this.scan.pages.find(el=>el.id == page_id);
            scanned_page.rescan.status = response.data.data;
            
          })
        }
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useScanStore, import.meta.hot))
}
