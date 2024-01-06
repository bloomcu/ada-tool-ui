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
     * Store a scan
     *
     * @param Object scan [Properties to create scan from]
     * @return promise
     */
    store(organization, scan) {
        return HttpClient.post(`/${organization}/scans`, scan)
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
     * Update a scan
     *
     * @param Integer id [Id of the scan you want to update]
     * @param Object  scan [Properties to update scan with]
     * @return promise
     */
    update(organization, id, scan) {
      return HttpClient.put(`/${organization}/scans/${id}`, scan)
    },
    
    /**
     * Destroy a scan
     *
     * @param Integer id [Id of the file you want to destroy]
     * @return promise
     */
    destroy(organization, id) {
        return HttpClient.delete(`/${organization}/scans/${id}`)
    },
}

export { scanApi }
