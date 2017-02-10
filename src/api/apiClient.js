import rest from 'rest'
import mime from 'rest/interceptor/mime'

const restApiClient = (store) => {
    const client = rest.wrap(mime, { mime: 'application/json' })
    const state = store.getState()
    return (params) => {
        const headers = state.session.headers
        const reqParams = {...params, headers}
        return new Promise((resolve, reject) => {
            client(reqParams).then(
                response => {
                    store.dispatch({type: 'ACTION', headers: response.headers})
                    resolve(response.entity)
                }
            ).catch(error => {
                rejct(error)
            })
        })
    }
}

export default restApiClient
