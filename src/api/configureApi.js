import rest from 'rest'
import mime from 'rest/interceptor/mime'

const apiConfiguration =  {
    configureApi(store) {
        this.api = restApiClient(store)
    }
}

const restApiClient = ({ getState, dispatch }) => {
    const client = rest.wrap(mime, { mime: 'application/json' })
    return (params) => {
        const headers = getState().session.headers
        const reqParams = {...params, headers}
        return new Promise((resolve, reject) => {
            client(reqParams).then(
                response => {
                    dispatch({type: 'ACTION', headers: response.headers})
                    resolve(response.entity)
                }
            ).catch(error => {
                rejct(error)
            })
        })
    }
}
export default apiConfiguration
