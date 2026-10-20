import { defineStore, acceptHMRUpdate } from 'pinia'
import { scanApi as ScanApi } from '@/domain/scans/api/scanApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

/**
 * Pull the filename out of a response's Content-Disposition header
 * Falls back when the header is absent or not exposed by CORS
 */
function filenameFromResponse(response, fallback) {
  const disposition = response.headers?.['content-disposition']
  const match = disposition?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i)

  return match ? decodeURIComponent(match[1]) : fallback
}

/**
 * Hand a blob to the browser as a file download
 */
function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const useScanStore = defineStore('scanStore', {
    state: () => ({
        scans: [],
        scan: null,
        isLoading: true,
        isExporting: false,
        importMessage: null,
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

        /**
         * Re-fetch the scan without the loading skeleton — used to follow a queued import
         */
        async refresh(id) {
          const auth = useAuthStore()

          await ScanApi.show(auth.organization, id)
            .then(response => {
              this.scan = response.data.data
            })
        },

        /**
         * Queue the dataset import. The API answers 202 straight away (the import runs in the
         * background), or 409 when an import is already running or the scan was already imported
         */
        async importDataset(id) {
          const auth = useAuthStore()
          this.importMessage = null

          await ScanApi.importDataset(auth.organization, id)
            .then(response => {
              this.scan.import_status = response.data.data.import_status
            })
            .catch(error => {
              if (error.response?.status === 409) {
                this.importMessage = error.response.data.message
                this.scan.import_status = error.response.data.data?.import_status ?? this.scan.import_status
              } else {
                this.importMessage = 'The import could not be started. Please try again.'
              }
            })
        },

        async exportIssues(id) {
          const auth = useAuthStore()
          this.isExporting = true

          await ScanApi.exportIssues(auth.organization, id)
            .then(response => {
              downloadBlob(response.data, filenameFromResponse(response, `scan-${id}-issues.json`))
            })
            .catch(error => {
              console.log('Error exporting issues', error)
            })
            .finally(() => {
              this.isExporting = false
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
          this.importMessage = null
          await ScanApi.importPageDataset(auth.organization, site_id, scan_id, page_id)
          .then(() => {
            let scanned_page = this.scan.pages.find(el=>el.id == page_id);
            scanned_page.rescan = null;
          })
          .catch(error => {
            // 409: a full import of this scan is running; 422: the rescan has no results yet
            if ([409, 422].includes(error.response?.status)) {
              this.importMessage = error.response.data.message
            }
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
