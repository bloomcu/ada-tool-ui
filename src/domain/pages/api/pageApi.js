import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const pageApi = {
    /**
     * Show a page
     *
     * @param Integer id [Id of the page you want to show]
     * @return promise
     */
    show(organization, scanId, pageId) {
      return HttpClient.get(`/${organization}/scans/${scanId}/pages/${pageId}`)
    },
}

export { pageApi }
