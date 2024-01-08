import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const scanApi = {
    /**
     * List scans
     *
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
        return HttpClient.get(`/${organization}/scans`, { params: params })
    },
    
    /**
     * Show a scan
     *
     * @param Integer id [Id of the scan you want to show]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/scans/${id}`)
    },

    /**
     * Check status of a scan
     *
     * @param Integer id [Id of the scan you want to check]
     * @return promise
     */
    checkStatus(organization, id) {
      return HttpClient.get(`/${organization}/scans/${id}/status`)
    },

    /**
     * Show dataset of a scan
     *
     * @param Integer id [Id of the scan you want dataset from]
     * @return promise
     */
    showDataset(organization, id) {
      return HttpClient.get(`/${organization}/scans/${id}/dataset`)
    },

    /**
     * Import dataset of a scan
     *
     * @param Integer id [Id of the scan you want to import dataset from]
     * @return promise
     */
    importDataset(organization, id) {
      return HttpClient.get(`/${organization}/scans/${id}/import`)
    },
}

export { scanApi }
