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
}

export { scanApi }
