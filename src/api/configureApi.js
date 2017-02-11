import rest from 'rest'
import mime from 'rest/interceptor/mime'

const apiConfiguration =  {
    configureApi(store, baseUrl) {
        this.api = restApiClient(store, baseUrl)
    }
}

const restApiClient = ({ getState, dispatch }, baseUrl) => {
    const client = rest.wrap(mime, { mime: 'application/json' })
    const trimUrl = baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl
    return (params) => {
        const headers = getState().session.headers
        const {path, ...others} = params
        const fullUrl = trimUrl + path
        const reqParams = {path: fullUrl, ...others, headers}
        return new Promise((resolve, reject) => {
            client(reqParams).then(
                response => {
                    dispatch({type: 'ACTION', headers: response.headers})
                    resolve(response.entity)
                }
            ).catch(error => {
                reject(error)
            })
        })
    }
}
export default apiConfiguration
