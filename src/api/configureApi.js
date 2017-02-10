import apiClient from './apiClient'

const apiConfiguration =  {
    configureApi(store) {
        this.api = apiClient(store)
    }
}
export default apiConfiguration
