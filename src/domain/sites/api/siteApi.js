import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const siteApi = {
    /**
     * List sites
     *
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
        return HttpClient.get(`/${organization}/sites`, { params: params })
    },
    
    /**
     * Store a site
     *
     * @param Object site [Properties to create site from]
     * @return promise
     */
    store(organization, site) {
        return HttpClient.post(`/${organization}/sites`, site)
    },
    
    /**
     * Show a site
     *
     * @param Integer id [Id of the site you want to show]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/sites/${id}`)
    },
    
    /**
     * Update a site
     *
     * @param Integer id [Id of the site you want to update]
     * @param Object  site [Properties to update site with]
     * @return promise
     */
    update(organization, id, site) {
      return HttpClient.put(`/${organization}/sites/${id}`, site)
    },
    
    /**
     * Destroy a site
     *
     * @param Integer id [Id of the file you want to destroy]
     * @return promise
     */
    destroy(organization, id) {
        return HttpClient.delete(`/${organization}/sites/${id}`)
    },
}

export { siteApi }
